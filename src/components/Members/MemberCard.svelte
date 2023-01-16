<script lang="ts">
    import { Link } from "svelte-navigator";
    import type { MemberType } from "../../utils/types";
    import Card from "../UI/Card.svelte";

    export let member: MemberType
</script>


<Link to="/members/{member.id}/">
    <Card cardClassName={member.invited ? "invited mb-3" : "mb-3"}>
        <div slot="card-body" class="d-flex align-items-center">
            <span class="user_photo_nav user_photo">
                {member.first_name[0]}{member
                    .last_name[0]}
            </span>
            <div class="info_user" >
                <strong class="text-primary">
                    {member.full_name}
                </strong>
                {#if member.invited}
                    <p class="text-muted mb-0">
                        invited...
                    </p>
                {:else}
                    <p class="text-muted mb-0">
                        Member since: {member.created}
                    </p>                       
                {/if}
            </div>
        </div>
    </Card>
</Link>

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