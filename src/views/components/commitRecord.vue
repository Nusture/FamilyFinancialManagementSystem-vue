<template>
  <div class="commitRecord">
    <div style="text-align:right;">
      <el-select v-model="year" placeholder="请选择年度" style="width:200px;" filterable clearable @change="getdata">
        <el-option label="2018" value="2018" />
        <el-option label="2019" value="2019" />
        <el-option label="2020" value="2020" />
        <el-option label="2021" value="2021" />
      </el-select>
    </div>
    <div id="commitRecord" v-loading="loading" style="height: 400px;"></div>
  </div>
</template>
<script>
import { Heatmap, G2 } from '@antv/g2plot';
import { nextTick, onMounted, reactive, ref, toRefs, watch } from '@vue/runtime-core';
import { commitRecord } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import dates from '@/utils/date'
export default {
  setup() {
    const state = reactive({
      year: '2021',
      loading: false,
      datas: []
    });
    const getdata = async () => {
      state.loading = true;
      const { data } = await commitRecord({ token: getToken(), year: state.year });
      if (data) {
        state.loading = false;
        state.datas = data;
        console.log(state.datas, 'datas');
      }
      // .then(res => {
      //   if (res.code === 200) {
      //     state.datas = res.data;
      //     datas = res.data
      //     console.log(state.datas,'datas')
      //     state.loading = false;
      //   } else {
      //     ElMessage.warning('当前网络延迟较高');
      //   }
      // })
      // .catch(() => {
      //   state.loading = false;
      // });
    };
    const AreaG2 = () => {
      console.log(state.datas, 'data');
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
                stroke: '#404040'
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
      // const datas = []
      const heatmapPlot = new Heatmap(document.getElementById('commitRecord'), {
        data: dates,
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
        // color: ( {commits} ) => {
        //   if (commits === 2) {
        //     return 'red';
        //   } else {
        //   return 'yellow';

        //   }
        // },
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
                return 'MAY';
              } else if (val === '6') {
                return 'JUN';
              } else if (val === '10') {
                return 'JUL';
              } else if (val === '15') {
                return 'AUG';
              } else if (val === '19') {
                return 'SEP';
              } else if (val === '24') {
                return 'OCT';
              }
              return '';
            }
          }
        }
      });
      heatmapPlot.update(heatmapPlot);
    };
    onMounted(() => {
      nextTick(() => {
        getdata();
        AreaG2();
      });
    });
    return {
      ...toRefs(state),
      getdata
    };
  }
};
</script>
<style scoped>
#AreaG2 {
  /* height: 35vh; */
}
</style>