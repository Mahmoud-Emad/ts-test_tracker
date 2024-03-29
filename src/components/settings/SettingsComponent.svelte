<script lang="ts">
  export let isLoading: boolean;
  import Tabs from '../UI/Tabs.svelte';
  import type { TabType } from '../../utils/types';
  import Navbar from '../UI/navbar/Navbar.svelte';
  import { alertStore } from '../../stores/utils';
  import { userStore } from '../../stores/users';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import ProfileInformation from './ProfileInformation.svelte';
  import UpdatePassword from './UpdatePassword.svelte';
  import SettingsService from '../../apis/settings';
  import Alert from '../UI/Alert.svelte';
  import Button from '../UI/forms/Button.svelte';
  import { validateName, validatePhone } from '../../utils/validators';
  import ChangeMode from './ChangeMode.svelte';

  let disabledForm = true;

  const tabs: TabType[] = [
    {
      tabID: 'information',
      tabName: 'Information',
      component: ProfileInformation,
      isActive: true,
    },
    {
      tabID: 'advanced',
      tabName: 'Advanced',
      component: UpdatePassword,
      isActive: false,
    },
  ];

  const updateSettings = async () => {
    return await SettingsService.update( $userStore );
  };

  $: if ( $userStore ) {
    disabledForm =
      !validateName( $userStore.first_name ).isValid ||
      !validateName( $userStore.last_name ).isValid ||
      !validatePhone( $userStore.phone ).isValid;
  }
</script>

{#if isLoading}
  <LoadingComponent className={'page'} />
{:else}
  <Navbar>
    <div slot="action-btn">
      <ChangeMode />
    </div>
  </Navbar>
  <div class="container">
    {#if $userStore}
      <div class="mt-3">
        <div class="header">
          <strong class="h4"
            >Settings |
            <strong class="text-primary">
              {$userStore.first_name !== undefined ? $userStore.first_name + " " + $userStore.last_name : "Page"}
            </strong>
          </strong>
        </div>
        <div class="mt-3">
          <Tabs {tabs} />
        </div>
      </div>
    {/if}
    <div class="mt-3">
      {#if $alertStore.isOpen}
        <Alert
          isOpen={$alertStore.isOpen}
          message={$alertStore.message}
          title={$alertStore.title}
          className={$alertStore.className}
          error={$alertStore.error}
        />
      {/if}
    </div>

    <div class="mt-3 d-flex justify-content-center mx-4 mb-3 mb-lg-4">
      <Button
        className={'btn btn-primary btn-lg'}
        onClick={updateSettings}
        disabled={disabledForm}
        text={'Save'}
      />
    </div>
  </div>
{/if}
