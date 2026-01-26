---
title: 'Dashboard de Ventas con Predicción ML'
description: 'Sistema de BI integrado con machine learning para predecir tendencias de ventas y optimizar inventario en tiempo real.'
publishDate: 2024-01-15
tech: ['Power BI', 'Python', 'Azure ML', 'SQL Server', 'DAX']
metrics:
  - label: 'Precisión'
    value: '90%'
  - label: 'ROI Optimizado'
    value: '25%'
github: 'https://github.com/tu-usuario/sales-dashboard'
featured: true
---

## Descripción del Proyecto

Desarrollé un dashboard interactivo en Power BI que integra modelos de machine learning para predecir tendencias de ventas con 90% de precisión, permitiendo a la empresa optimizar inventario y reducir costos operativos en un 25%.

## Problema de Negocio

La empresa enfrentaba:

- **Sobrestocking** en productos de baja rotación
- **Falta de stock** en productos populares
- **Tiempo de análisis** de 2-3 días para generar reportes
- **Decisiones reactivas** en lugar de proactivas

## Solución Implementada

### 1. Pipeline de Datos ETL

- Automatización de extracción desde múltiples fuentes (SQL Server, archivos CSV, APIs)
- Transformación y limpieza de datos con Python (Pandas)
- Carga incremental optimizada

### 2. Modelo Predictivo

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import TimeSeriesSplit

# Modelo de predicción de ventas
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
```

### 3. Dashboard Power BI

- Visualizaciones interactivas con drill-down
- Predicciones en tiempo real
- Alertas automáticas para anomalías
- KPIs dinámicos

## Resultados

- ✅ **90% de precisión** en predicciones de ventas
- ✅ **25% reducción** en costos de inventario
- ✅ **2 horas** vs 2 días en tiempo de reporting
- ✅ **15% aumento** en ventas por mejor disponibilidad

## Tecnologías Utilizadas

- **Power BI**: Visualización y dashboards
- **Python**: Scikit-learn, Pandas, NumPy
- **Azure ML**: Deploy y monitoreo del modelo
- **SQL Server**: Base de datos principal
- **DAX**: Cálculos avanzados en Power BI
