<template>
    <div>
        <MainHeader></MainHeader>
        <MainSidebar></MainSidebar>
        <router-view style="overflow-y:scoll;height:auto;"></router-view> 
    </div>
</template>

<<script>
import MainSidebar from '@/components_gen/MainSidebar';
import MainHeader from '@/components_gen/MainHeader';

    export default {
        name: 'General',
        components: {
            'MainSidebar': MainSidebar,
            'MainHeader': MainHeader
        }
    }
</script>
