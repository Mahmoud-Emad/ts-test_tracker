<script lang="ts">
  import { Link } from 'svelte-navigator';
  import type { MemberType } from '../../../utils/types';
  import Alert from '../../UI/Alert.svelte';
  export let member: MemberType;
</script>

{#if member.last_project_working_on}
  <div class="card mt-4 p-4">
    <div class="pt-4">
      <p class="h5 text-color">Last Project Worked on</p>
      <hr />
    </div>
    <table class="table table-borderless">
      <tbody>
        <tr>
          <th scope="row" class="text-color">Name</th>
          <td class="text-primary">
            <a
              class="text-primary"
              href="/projects/{member.last_project_working_on.id}"
            >
              {member.last_project_working_on.title.slice( 0, 50 )}
            </a>
          </td>
          <th scope="row" class="text-color"> Updated date </th>
          <td class="text-primary">
            {member.last_project_working_on.modified}
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-color"> Pinding tasks </th>
          {#if member.incomplete_test_runs_assigned_to_you.length > 0}
            <td class="text-primary">
              <a
                class="text-primary"
                href="/projects/{member.incomplete_test_runs_assigned_to_you[0]
                  .project_id}/runs/{member
                  .incomplete_test_runs_assigned_to_you[0].id}"
              >
                {member.incomplete_test_runs_assigned_to_you[0].title}
              </a>
            </td>
          {:else}
            <td class="text-color"> There are no pinding tasks. </td>
          {/if}
          <th scope="row" class="text-color"> Created date </th>
          <td class="text-primary">
            {member.last_project_working_on.created}
          </td>
        </tr>
      </tbody>
    </table>
    <strong class="pl-3 text-color">Team</strong>
    <hr />
    <div class="row">
      {#if member.last_project_working_on.teams.length === 0}
        <div class="col-12 text-color">
          <Alert
            className={'info'}
            isOpen={true}
            close={false}
            message={'There are no teams yet, only you.'}
          />
        </div>
      {:else}
        {#each member.last_project_working_on.teams as person}
          {#if person.id != member.id}
            <div class="col team-col">
              <span
                style="background-color: {person.background_color};"
                class="team-image-span"
                data-tooltip={person.full_name}
              >
                <Link to="/members/{person.id}" class="team-image-span-a">
                  {person.first_name[0]}{person.last_name[0]}
                </Link>
              </span>
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
{/if}
