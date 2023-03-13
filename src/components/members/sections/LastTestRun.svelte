<script lang="ts">
  import type { MemberType } from '../../../utils/types';
  export let member: MemberType;
</script>

{#if member.last_tests_assigned}
  <div class="card mt-4 p-4">
    <div class="pt-4">
      <p class="h5 text-color">Last Test Run Assigned</p>
      <hr />
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th scope="row" class="text-color">Name</th>
            <td
              ><a
                href="/projects/{member.last_tests_assigned
                  .project_id}/runs/{member.last_tests_assigned.id}"
                class="text-primary"
                >{member.last_tests_assigned.title.slice( 0, 50 )}</a
              ></td
            >
            <th scope="row" class="text-color">Date</th>
            <td class="text-primary">{member.last_tests_assigned.created}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
{/if}
