<template>
    <h3>
        Success</h3>
</template>

<script>
export default {
    mounted() {
        if (window.opener) {
            window.opener.focus();

            if (window.opener.loginCallBack) {
                window.opener.loginCallBack();
            }
        }
        setTimeout(window.close(),300)
    }
}
</script>

<style>

</style>
