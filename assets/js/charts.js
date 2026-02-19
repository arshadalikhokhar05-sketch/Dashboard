/**
 * VELORA – Charts Initialization
 * Uses ApexCharts for all visualizations
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const C = window.VeloraApp?.getChartColors() || {};

    /* ────── SPARKLINES (KPI Cards) ────────────────── */
    const sparklineBase = {
        chart: {
            type: 'area', height: 40, sparkline: { enabled: true },
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.0 } },
        tooltip: {
            fixed: { enabled: false }, x: { show: false },
            y: { formatter: (v) => v }, marker: { show: false }
        },
    };

    const sparkData = {
        revenue: [42, 38, 55, 48, 62, 58, 70, 65, 80, 74, 92, 88],
        profit: [28, 22, 35, 30, 40, 38, 45, 41, 55, 50, 62, 58],
        orders: [12, 18, 14, 22, 19, 28, 25, 31, 27, 35, 32, 40],
        visitors: [320, 290, 410, 380, 450, 420, 510, 490, 580, 550, 630, 610],
        conversion: [2.1, 2.4, 2.2, 2.8, 3.1, 2.9, 3.4, 3.2, 3.8, 3.6, 4.1, 3.9],
        aov: [85, 92, 78, 95, 88, 102, 97, 110, 105, 118, 112, 125],
    };

    function mkSparkline(elId, data, color) {
        const el = document.getElementById(elId);
        if (!el) return;
        new ApexCharts(el, {
            ...sparklineBase,
            series: [{ data }],
            colors: [color],
        }).render();
    }

    mkSparkline('sparkRevenue', sparkData.revenue, '#c49c5a');
    mkSparkline('sparkProfit', sparkData.profit, '#4ade80');
    mkSparkline('sparkOrders', sparkData.orders, '#60a5fa');
    mkSparkline('sparkVisitors', sparkData.visitors, '#a78bfa');
    mkSparkline('sparkConversion', sparkData.conversion, '#f472b6');
    mkSparkline('sparkAov', sparkData.aov, '#34d399');

    /* ────── REVENUE AREA CHART ────────────────────── */
    const revenueChartEl = document.getElementById('revenueAreaChart');
    if (revenueChartEl) {
        new ApexCharts(revenueChartEl, {
            chart: {
                type: 'area', height: 300, toolbar: { show: false },
                fontFamily: 'Inter, sans-serif',
                animations: { enabled: true, easing: 'easeinout', speed: 900 }
            },
            series: [
                { name: 'This Month', data: [48, 62, 55, 78, 65, 88, 72, 95, 83, 105, 92, 118] },
                { name: 'Last Month', data: [38, 52, 45, 60, 55, 70, 60, 80, 68, 90, 78, 100] },
            ],
            colors: ['#c49c5a', '#60a5fa'],
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.25, opacityTo: 0.01 } },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: { style: { colors: Array(12).fill(C.textColor || '#a0a8c0'), fontSize: '11px' } },
                axisBorder: { show: false }, axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    style: { colors: [C.textColor || '#a0a8c0'], fontSize: '11px' },
                    formatter: (v) => '$' + v + 'k'
                }
            },
            grid: { borderColor: C.gridColor || 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
            legend: { labels: { colors: C.textColor || '#a0a8c0' } },
            tooltip: {
                theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
                y: { formatter: (v) => '$' + v + 'k' }
            },
            dataLabels: { enabled: false },
        }).render();
    }

    /* ────── REVENUE BY CHANNEL ────────────────────── */
    const channelChartEl = document.getElementById('channelDonut');
    if (channelChartEl) {
        new ApexCharts(channelChartEl, {
            chart: { type: 'donut', height: 220, fontFamily: 'Inter, sans-serif' },
            series: [42, 25, 18, 15],
            labels: ['Organic', 'Paid Ads', 'Referral', 'Social'],
            colors: ['#c49c5a', '#60a5fa', '#4ade80', '#f472b6'],
            legend: { position: 'bottom', labels: { colors: C.textColor || '#a0a8c0' }, fontSize: '12px' },
            plotOptions: {
                pie: {
                    donut: {
                        size: '72%', labels: {
                            show: true,
                            total: {
                                show: true, label: 'Total', color: C.textColor || '#a0a8c0',
                                formatter: () => '100%'
                            }
                        }
                    }
                }
            },
            dataLabels: { enabled: false },
            tooltip: { theme: 'dark' },
            stroke: { width: 0 },
        }).render();
    }

    /* ────── TOP PRODUCTS BAR CHART ────────────────── */
    const productBarEl = document.getElementById('productBarChart');
    if (productBarEl) {
        new ApexCharts(productBarEl, {
            chart: {
                type: 'bar', height: 240, toolbar: { show: false },
                fontFamily: 'Inter, sans-serif',
                animations: { enabled: true, easing: 'easeinout', speed: 800 }
            },
            series: [{ name: 'Revenue ($k)', data: [92, 78, 65, 54, 48, 42, 38] }],
            colors: ['#c49c5a'],
            plotOptions: {
                bar: {
                    borderRadius: 6, distributed: true, horizontal: false,
                    columnWidth: '55%'
                }
            },
            xaxis: {
                categories: ['Velocity X1', 'EcoCore Pro', 'LunaSet Ultra', 'MaxPulse', 'SwiftGlide', 'AeroFlow', 'TitanEdge'],
                labels: {
                    style: { colors: Array(7).fill(C.textColor || '#a0a8c0'), fontSize: '11px' },
                    rotate: -20
                },
                axisBorder: { show: false }, axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    style: { colors: [C.textColor || '#a0a8c0'], fontSize: '11px' },
                    formatter: (v) => '$' + v + 'k'
                }
            },
            grid: { borderColor: C.gridColor || 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
            dataLabels: { enabled: false },
            tooltip: { theme: 'dark', y: { formatter: (v) => '$' + v + 'k' } },
            legend: { show: false },
        }).render();
    }

    /* ────── CUSTOMERS DONUT ────────────────────────── */
    const customerDonutEl = document.getElementById('customerDonut');
    if (customerDonutEl) {
        new ApexCharts(customerDonutEl, {
            chart: { type: 'donut', height: 240, fontFamily: 'Inter, sans-serif' },
            series: [62, 38],
            labels: ['Returning', 'New'],
            colors: ['#c49c5a', '#60a5fa'],
            legend: { position: 'bottom', labels: { colors: C.textColor || '#a0a8c0' } },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%', labels: {
                            show: true,
                            total: {
                                show: true, label: 'Customers', color: C.textColor || '#a0a8c0',
                                formatter: () => '14.2k'
                            }
                        }
                    }
                }
            },
            dataLabels: { enabled: false },
            stroke: { width: 0 },
            tooltip: { theme: 'dark' },
        }).render();
    }

    /* ────── INVENTORY TURNOVER ────────────────────── */
    const inventoryChartEl = document.getElementById('inventoryChart');
    if (inventoryChartEl) {
        new ApexCharts(inventoryChartEl, {
            chart: {
                type: 'bar', height: 220, toolbar: { show: false },
                fontFamily: 'Inter, sans-serif'
            },
            series: [{ name: 'Turnover Rate', data: [4.2, 3.8, 5.1, 4.6, 6.0, 5.4, 3.2] }],
            colors: ['#4ade80'],
            plotOptions: { bar: { borderRadius: 5, columnWidth: '50%' } },
            xaxis: {
                categories: ['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports', 'Books', 'Toys'],
                labels: { style: { colors: Array(7).fill(C.textColor || '#a0a8c0'), fontSize: '10px' }, rotate: -20 },
                axisBorder: { show: false }, axisTicks: { show: false }
            },
            yaxis: { labels: { style: { colors: [C.textColor || '#a0a8c0'], fontSize: '11px' } } },
            grid: { borderColor: C.gridColor || 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
            dataLabels: { enabled: false },
            tooltip: { theme: 'dark' },
        }).render();
    }

    /* ────── ABANDONED CART TREND ──────────────────── */
    const cartTrendEl = document.getElementById('cartTrendChart');
    if (cartTrendEl) {
        new ApexCharts(cartTrendEl, {
            chart: {
                type: 'line', height: 200, toolbar: { show: false },
                fontFamily: 'Inter, sans-serif'
            },
            series: [{ name: 'Abandoned', data: [68, 72, 65, 78, 70, 74, 62, 66, 58, 63, 55, 60] }],
            colors: ['#f87171'],
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { opacityFrom: 0.2, opacityTo: 0.0 } },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: { style: { colors: Array(12).fill(C.textColor || '#a0a8c0'), fontSize: '10px' } },
                axisBorder: { show: false }, axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    style: { colors: [C.textColor || '#a0a8c0'], fontSize: '11px' },
                    formatter: (v) => v + '%'
                }
            },
            grid: { borderColor: C.gridColor || 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
            dataLabels: { enabled: false },
            tooltip: { theme: 'dark', y: { formatter: (v) => v + '%' } },
        }).render();
    }

    /* ────── AD CAMPAIGN COMPARISON ────────────────── */
    const adCampaignEl = document.getElementById('adCampaignChart');
    if (adCampaignEl) {
        new ApexCharts(adCampaignEl, {
            chart: {
                type: 'bar', height: 260, toolbar: { show: false },
                fontFamily: 'Inter, sans-serif'
            },
            series: [
                { name: 'ROAS', data: [4.2, 3.8, 5.1, 3.4] },
                { name: 'CPC ($)', data: [1.20, 0.85, 1.45, 0.92] },
                { name: 'CPM ($)', data: [8.50, 6.20, 9.80, 7.10] },
            ],
            colors: ['#c49c5a', '#60a5fa', '#4ade80'],
            plotOptions: { bar: { borderRadius: 5, columnWidth: '70%', grouped: true } },
            xaxis: {
                categories: ['Google Ads', 'Meta Ads', 'Shopify Ads', 'Stripe Ads'],
                labels: { style: { colors: Array(4).fill(C.textColor || '#a0a8c0'), fontSize: '11px' } },
                axisBorder: { show: false }, axisTicks: { show: false }
            },
            yaxis: { labels: { style: { colors: [C.textColor || '#a0a8c0'], fontSize: '11px' } } },
            grid: { borderColor: C.gridColor || 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
            legend: { labels: { colors: C.textColor || '#a0a8c0' } },
            dataLabels: { enabled: false },
            tooltip: { theme: 'dark' },
        }).render();
    }

    /* ────── AUDIENCE PERFORMANCE RADAR ────────────── */
    const audienceEl = document.getElementById('audienceRadar');
    if (audienceEl) {
        new ApexCharts(audienceEl, {
            chart: {
                type: 'radar', height: 280, toolbar: { show: false },
                fontFamily: 'Inter, sans-serif'
            },
            series: [
                { name: 'Q4 2024', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Q1 2025', data: [20, 30, 40, 80, 20, 80] },
            ],
            labels: ['Awareness', 'Consideration', 'Intent', 'Purchase', 'Loyalty', 'Advocacy'],
            colors: ['#c49c5a', '#60a5fa'],
            fill: { opacity: 0.15 },
            stroke: { width: 1.5 },
            markers: { size: 3 },
            yaxis: { show: false },
            xaxis: { labels: { style: { colors: Array(6).fill(C.textColor || '#a0a8c0'), fontSize: '11px' } } },
            legend: { labels: { colors: C.textColor || '#a0a8c0' } },
            tooltip: { theme: 'dark' },
        }).render();
    }

    /* ──── Init Pagination ─────────────────────────── */
    window.VeloraApp?.initPagination('productsTable', 6);
    window.VeloraApp?.initPagination('customersTable', 5);
    window.VeloraApp?.initPagination('inventoryTable', 6);
});
