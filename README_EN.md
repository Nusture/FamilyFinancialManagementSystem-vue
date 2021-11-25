# vue-manage-system
											// Enter template directory
    npm install													// Installation dependency

## Local development

    // Open server and access http://localhost:8080 in browser
    npm run serve

## Constructing production

    // Constructing project
    npm run build

## Component description and presentation

### vue-schart

Vue.js wrapper for sChart.js. Github : [vue-schart](https://github.com/linxin/vue-schart)

```html
<template>
    <div>
        <schart class="wrapper" canvasId="myCanvas" :options="options"></schart>
    </div>
</template>

<script>
    import Schart from "vue-schart"; // 导入Schart组件
    export default {
        data() {
            return {
                options: {
                    type: "bar",
                    title: {
                        text: "最近一周各品类销售图",
                    },
                    labels: ["周一", "周二", "周三", "周四", "周五"],
                    datasets: [
                        {
                            label: "家电",
                            data: [234, 278, 270, 190, 230],
                        },
                        {
                            label: "百货",
                            data: [164, 178, 190, 135, 160],
                        },
                        {
                            label: "食品",
                            data: [144, 198, 150, 235, 120],
                        },
                    ],
                },
            };
        },
        components: {
            Schart,
        },
    };
</script>
<style>
    .wrapper {
        width: 7rem;
        height: 5rem;
    }
</style>
```

### element-ui

A desktop component library based on vue.js2.0 . Github : [element](http://element.eleme.io/#/zh-CN/component/layout)

## Screenshot

### Default theme

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms1.png)

### Login

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms3.png)

## License

[MIT](https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE)
