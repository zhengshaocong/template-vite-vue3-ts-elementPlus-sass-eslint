import type { Plugin } from 'vue';
import { Icon } from '@iconify/vue';

export default <Plugin> {
    install: (app) => {
        app.component('Icon', Icon);
    },
};