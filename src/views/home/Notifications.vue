<template>
    <div>
        <v-subheader> {{ header }} </v-subheader>
    </div>
</template>

<script>
export default {
    name: "Notifications",
    data() {
        return {
            header:"Notifications"
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {

        }
    }
}
</script>

<style scoped>
.v-subheader {
    font-size: 28px;
}
</style>