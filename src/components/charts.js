import Chart from 'chart.js/auto';
import { getMonthBalance, getMonths } from '/src/modules/utility';

export function createChart(obj) {
  if(!obj) return;
  let legend = getMonths(6);
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: legend.reverse(),
          datasets: [{
              data: [
                getMonthBalance(obj, 5, true),
                getMonthBalance(obj, 4, true),
                getMonthBalance(obj, 3, true),
                getMonthBalance(obj, 2, true),
                getMonthBalance(obj, 1, true),
                getMonthBalance(obj, 0, true),
              ],
              backgroundColor: [
                  'rgba(17, 106, 204, 1)'
              ],
              borderColor: [
                  'rgba(17, 106, 204, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        tooltips: {
          yAlign: 'top'
        },
        scales: {
            y: {
                beginAtZero: true,
                position: 'right',
                grid: {
                  display: false,
                  drawBorder: true
                },
                ticks: {
                  font: {
                    size: 20
                  },
                  min: 0, // minimum value
                  // max: 9999999999,
                  stepSize: 10000000
                }
            },
            x: {
              grid: {
                display: false,
                drawBorder: true
              },
              ticks: {
                font: {
                  size: 20
                }
              }
            }
        }
      }
  });
};

export function createChartBalance(obj) {
  let legend = getMonths(12);
  const ctx = document.getElementById('details__dynamic').getContext('2d');
  ctx.height = 500;
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: legend.reverse(),
          datasets: [{
              label: 'Динамика баланса',
              data: [
                getMonthBalance(obj, 11, true),
                getMonthBalance(obj, 10, true),
                getMonthBalance(obj, 9, true),
                getMonthBalance(obj, 8, true),
                getMonthBalance(obj, 7, true),
                getMonthBalance(obj, 6, true),
                getMonthBalance(obj, 5, true),
                getMonthBalance(obj, 4, true),
                getMonthBalance(obj, 3, true),
                getMonthBalance(obj, 2, true),
                getMonthBalance(obj, 1, true),
                getMonthBalance(obj, 0, true),
              ],
              backgroundColor: [
                  'rgba(17, 106, 204, 1)'
              ],
              borderColor: [
                  'rgba(17, 106, 204, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          yAlign: 'top'
        },
        scales: {
            y: {
                beginAtZero: true,
                position: 'right',
                grid: {
                  display: false,
                  drawBorder: true
                },
                ticks: {
                  min: 0, // minimum value
                  // max: 9999999999,
                  stepSize: 1000000
                }
            },
            x: {
              grid: {
                display: false,
                drawBorder: true
              }
            }
        }
      }
  });
};

export function createChartTransactions(obj) {
  let legend = getMonths(12);
  const ctx = document.getElementById('details__transactions').getContext('2d');
  ctx.height = 500;
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: legend.reverse(),
          datasets: [{
            label: 'Сумма исходящих транзакций',
            data: [
              getMonthBalance(obj, 11),
              getMonthBalance(obj, 10),
              getMonthBalance(obj, 9),
              getMonthBalance(obj, 8),
              getMonthBalance(obj, 7),
              getMonthBalance(obj, 6),
              getMonthBalance(obj, 5),
              getMonthBalance(obj, 4),
              getMonthBalance(obj, 3),
              getMonthBalance(obj, 2),
              getMonthBalance(obj, 1),
              getMonthBalance(obj, 0),
            ],
            backgroundColor: [
                'rgba(253, 78, 93, 1)'
            ],
            borderColor: [
                'rgba(253, 78, 93, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Сумма входящих транзакций',
            data: [
              getMonthBalance(obj, 11, true),
              getMonthBalance(obj, 10, true),
              getMonthBalance(obj, 9, true),
              getMonthBalance(obj, 8, true),
              getMonthBalance(obj, 7, true),
              getMonthBalance(obj, 6, true),
              getMonthBalance(obj, 5, true),
              getMonthBalance(obj, 4, true),
              getMonthBalance(obj, 3, true),
              getMonthBalance(obj, 2, true),
              getMonthBalance(obj, 1, true),
              getMonthBalance(obj, 0, true),
            ],
            backgroundColor: [
                'rgba(118, 202, 102, 1)'
            ],
            borderColor: [
                'rgba(118, 202, 102, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          yAlign: 'top'
        },
        scales: {
            y: {
                beginAtZero: true,
                position: 'right',
                grid: {
                  display: false,
                  drawBorder: true
                },
                stacked: true,
                ticks: {
                  callback: function(val, index) {
                    // Hide every 2nd tick label
                    return index % 2 === 0 ? this.getLabelForValue(val) : '';
                  },
                }
            },
            x: {
              stacked: true,
              grid: {
                display: false,
                drawBorder: true
              }
            }
        }
      }
  });
};
