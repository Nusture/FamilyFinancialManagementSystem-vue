<template>
  <div class="commitRecord">
    <div id="commitRecord" v-loading="loading" style="height: 400px;"></div>
  </div>
</template>
<script>
import { Heatmap, G2 } from '@antv/g2plot';
import { inject, nextTick, onMounted, reactive, ref, toRefs } from '@vue/runtime-core';
import { watch } from 'vue';
import { commitRecord } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import dates from '@/utils/date';
export default {
  props: ['chartdata'],
  setup(props) {
    const state = reactive({
      year: '2021',
      yearlist: [],
      loading: false,
      datas: []
    });
    const AreaG2 = async data => {
      G2.registerShape('polygon', 'boundary-polygon', {
        draw(cfg, commitRecord) {
          const group = commitRecord.addGroup();
          const attrs = {
            stroke: '#fff',
            lineWidth: 1,
            fill: cfg.color,
            paht: []
          };
          const points = cfg.points;
          const path = [
            ['M', points[0].x, points[0].y],
            ['L', points[1].x, points[1].y],
            ['L', points[2].x, points[2].y],
            ['L', points[3].x, points[3].y],
            ['Z']
          ];
          // @ts-ignore
          attrs.path = this.parsePath(path);
          group.addShape('path', {
            attrs
          });

          if (cfg.data.lastWeek) {
            const linePath = [
              ['M', points[2].x, points[2].y],
              ['L', points[3].x, points[3].y]
            ];
            // 最后一周的多边形添加右侧边框
            group.addShape('path', {
              attrs: {
                path: this.parsePath(linePath),
                lineWidth: 4,
                stroke: '#000'
              }
            });
            if (cfg.data.lastDay) {
              group.addShape('path', {
                attrs: {
                  path: this.parsePath([
                    ['M', points[1].x, points[1].y],
                    ['L', points[2].x, points[2].y]
                  ]),
                  lineWidth: 4,
                  stroke: '#404040'
                }
              });
            }
          }
          return group;
        }
      });

      const heatmapPlot = new Heatmap(document.getElementById('commitRecord'), {
        data,
        height: 300,
        autoFit: false,
        xField: 'week',
        yField: 'day',
        colorField: 'commits',
        reflect: 'y',
        shape: 'boundary-polygon',
        meta: {
          day: {
            type: 'cat',
            values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          },
          week: {
            type: 'cat'
          },
          commits: {
            sync: true
          },
          date: {
            type: 'cat'
          }
        },
        yAxis: {
          grid: null
        },
        tooltip: {
          title: 'date',
          showMarkers: false
        },
        interactions: [{ type: 'element-active' }],
        xAxis: {
          position: 'top',
          tickLine: null,
          line: null,
          label: {
            offset: 12,
            style: {
              fontSize: 12,
              fill: '#666',
              textBaseline: 'top'
            },
            formatter: val => {
              if (val === '2') {
                return '一月';
              } else if (val === '6') {
                return '二月';
              } else if (val === '10') {
                return '三月';
              } else if (val === '14') {
                return '四月';
              } else if (val === '20') {
                return '五月';
              } else if (val === '24') {
                return '六月';
              } else if (val === '28') {
                return '七月';
              } else if (val === '32') {
                return '八月';
              } else if (val === '36') {
                return '九月';
              } else if (val === '40') {
                return '十月';
              } else if (val === '44') {
                return '十一月';
              } else if (val === '48') {
                return '十二月';
              }
              return '';
            }
          }
        }
      });
      heatmapPlot.update();
    };
    const year = () => {
      const data = new Date();
      state.yearlist.push(
        JSON.stringify(data.getFullYear()),
        JSON.stringify(data.getFullYear() - 1),
        JSON.stringify(data.getFullYear() - 2)
      );
    };
    watch(
      () => props.chartdata,
      (newProps, oldProps) => {}
    );
    onMounted(() => {
      year();
      nextTick(() => {
        AreaG2(props.chartdata);
      });
    });
    return {
      ...toRefs(state),
      AreaG2
    };
  }
};
</script>
<style scoped>
#AreaG2 {
  /* height: 35vh; */
}
</style>