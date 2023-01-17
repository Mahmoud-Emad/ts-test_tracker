<script lang="ts">
    import { membersStore, userStore } from "../../../utils/stores";
</script>

<div class="card mt-2 p-4">
    <div class="mb-1">
        <p class="h5 text-color">Personal Information</p>
        <hr />
        <table class="table table-borderless">
            <tbody>
                <tr>
                    <th scope="row" class="text-color">Full Name</th
                    >
                    <td class="text-primary">{$membersStore[0].full_name}</td>
                    <th scope="row" class="text-color">Email</th>
                    <td class="text-primary">{$membersStore[0].email}</td>
                </tr>
                <tr>
                    <th scope="row" class="text-color"
                        >Phone Number</th
                    >
                    {#if $membersStore[0].phone.length === 0}
                        <td class="text-color">Not set yet</td>
                    {:else}
                        <td class="text-primary">{$membersStore[0].phone}</td>
                    {/if}
                    <th scope="row" class="text-color"
                        >Joined date</th
                    >
                    <td class="text-primary">{$membersStore[0].created}</td>
                </tr>
                <tr>
                    <th scope="row" class="text-color"
                        >Permission</th
                    >
                    {#if $membersStore[0].permission == "full_access"}
                        <td class="text-primary">Full Access</td>
                    {:else}
                        <td class="text-primary">Admin</td>
                    {/if}
                </tr>
            </tbody>
        </table>
        {#if $userStore.id === $membersStore[0].id}
            <small><a href="/settings">Update.</a></small>
        {/if}
    </div>
</div>