<script lang="ts">
  import { Link } from 'svelte-navigator';
  import type { MemberType } from '../../utils/types';
  import Card from '../UI/Card.svelte';

  export let member: MemberType;
</script>

<div class="col-6">
  <Link to="/members/{member.id}/">
    <Card
      cardClassName={member.invited ? 'invited mb-3 radius-5' : 'mb-3 radius-5'}
      cardClassBody={'pt-0'}
      withHeader={true}
      cardClassHeader={'border-bottom-0'}
    >
      <div slot="card-header">
        <div class="d-flex justify-content-center">
          <span
            class="user_photo_nav user_photo"
            style="background: {member.background_color}"
          >
            {member.first_name[0]}{member.last_name[0]}
          </span>
        </div>
      </div>
      <div slot="card-body" class="d-flex align-items-center pt-0">
        <div class="info_user">
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <strong class="text-color">
                {member.full_name}
              </strong>
            </div>
            <div class="col-12">
              {#if member.invited}
                <p class="text-muted text-center mb-0">invited...</p>
              {:else}
                <p class="text-muted text-center mb-0">
                  Member since: {member.created}
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Link>
</div>

<style>
  .info_user {
    flex: 1;
  }
  .info_user strong {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .user_photo {
    margin-right: 15px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 25px;
  }
</style>
