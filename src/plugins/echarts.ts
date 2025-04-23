import { type App } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart,GraphChart,HeatmapChart,RadarChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    VisualMapComponent,
    TimelineComponent,
    MarkAreaComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

export default {
    install (app: App): void {
        // 注册echarts核心组件
        use([
            CanvasRenderer,
            PieChart,
            BarChart,
            LineChart,
            GraphChart,
            HeatmapChart,
            RadarChart,

            TitleComponent,
            TooltipComponent,
            LegendComponent,
            GridComponent,
            VisualMapComponent,
            TimelineComponent,
            MarkAreaComponent,
        ]);

        // 注册全局组件
        app.component('VChart', VChart);
    },
};