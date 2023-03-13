<script lang="ts">
  import { userStore } from '../../../utils/store';
  import type { MemberType } from '../../../utils/types';
  export let member: MemberType;
</script>

<div class="card mt-2 p-4">
  <div class="mb-1">
    <p class="h5 text-color">Personal Information</p>
    <hr />
    <table class="table table-borderless">
      <tbody>
        <tr>
          <th scope="row" class="text-color">Full Name</th>
          <td class="text-primary">{member.full_name}</td>
          <th scope="row" class="text-color">Email</th>
          <td class="text-primary">{member.email}</td>
        </tr>
        <tr>
          <th scope="row" class="text-color">Phone Number</th>
          {#if member.phone.length === 0}
            <td class="text-color">Not set yet</td>
          {:else}
            <td class="text-primary">{member.phone}</td>
          {/if}
          <th scope="row" class="text-color">Joined date</th>
          <td class="text-primary">{member.created}</td>
        </tr>
        <tr>
          <th scope="row" class="text-color">Permission</th>
          {#if member.permission == 'full_access'}
            <td class="text-primary">Full Access</td>
          {:else}
            <td class="text-primary">Admin</td>
          {/if}
        </tr>
      </tbody>
    </table>
    {#if $userStore.id === member.id}
      <small><a href="/settings">Update.</a></small>
    {/if}
  </div>
</div>
