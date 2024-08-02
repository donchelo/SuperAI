import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import { leerCSV } from '../../services/csvService';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'];
const SalesByProductPieChart = () => {
    const [salesData, setSalesData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await leerCSV('ventas');
                setSalesData(data);
            }
            catch (err) {
                setError('Error al cargar los datos de ventas');
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);
    const years = useMemo(() => {
        return [...new Set(salesData.map(sale => new Date(sale.fecha).getFullYear()))].sort();
    }, [salesData]);
    useEffect(() => {
        if (years.length > 0 && !years.includes(selectedYear)) {
            setSelectedYear(Math.max(...years));
        }
    }, [years, selectedYear]);
    const data = useMemo(() => {
        const filteredSales = salesData.filter(sale => new Date(sale.fecha).getFullYear() === selectedYear);
        const salesByProduct = filteredSales.reduce((acc, sale) => {
            const precio = typeof sale.precio === 'number' ? sale.precio : parseFloat(sale.precio.toString());
            acc[sale.producto] = (acc[sale.producto] || 0) + precio;
            return acc;
        }, {});
        return Object.entries(salesByProduct)
            .filter(([_, value]) => value > 0)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [salesData, selectedYear]);
    const formatValue = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
    };
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        return (React.createElement("g", null,
            React.createElement("text", { x: cx, y: cy, dy: 8, textAnchor: "middle", fill: fill, fontSize: 20, fontWeight: "bold" }, payload.name),
            React.createElement(Sector, { cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle, fill: fill }),
            React.createElement(Sector, { cx: cx, cy: cy, startAngle: startAngle, endAngle: endAngle, innerRadius: outerRadius + 6, outerRadius: outerRadius + 10, fill: fill }),
            React.createElement("path", { d: `M${sx},${sy}L${mx},${my}L${ex},${ey}`, stroke: fill, fill: "none" }),
            React.createElement("circle", { cx: ex, cy: ey, r: 2, fill: fill, stroke: "none" }),
            React.createElement("text", { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, textAnchor: textAnchor, fill: "#333", fontSize: 14 }, `${payload.name}`),
            React.createElement("text", { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, dy: 18, textAnchor: textAnchor, fill: "#666", fontSize: 14 }, `${formatValue(value)} (${(percent * 100).toFixed(0)}%)`)));
    };
    if (isLoading)
        return React.createElement(CircularProgress, { size: 60 });
    if (error)
        return React.createElement(Typography, { color: "error" }, error);
    return (React.createElement(Box, { sx: { width: '100%', height: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        React.createElement(Typography, { variant: "h4", gutterBottom: true, sx: { mb: 4 } }, "Ventas por Producto"),
        React.createElement(FormControl, { sx: { mb: 4, minWidth: 120 } },
            React.createElement(InputLabel, { id: "year-select-label" }, "A\u00F1o"),
            React.createElement(Select, { labelId: "year-select-label", id: "year-select", value: selectedYear, label: "A\u00F1o", onChange: (e) => setSelectedYear(Number(e.target.value)) }, years.map(year => (React.createElement(MenuItem, { key: year, value: year }, year))))),
        data.length > 0 ? (React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
            React.createElement(PieChart, null,
                React.createElement(Pie, { activeIndex: activeIndex, activeShape: renderActiveShape, data: data, cx: "50%", cy: "50%", innerRadius: 100, outerRadius: 160, fill: "#8884d8", dataKey: "value", onMouseEnter: onPieEnter }, data.map((entry, index) => (React.createElement(Cell, { key: `cell-${index}`, fill: COLORS[index % COLORS.length] })))),
                React.createElement(Tooltip, { formatter: (value) => formatValue(value) }),
                React.createElement(Legend, null)))) : (React.createElement(Typography, { variant: "h6" },
            "No hay datos de ventas para el a\u00F1o ",
            selectedYear,
            "."))));
};
export default SalesByProductPieChart;
