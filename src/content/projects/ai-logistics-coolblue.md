---
title: 'Optimización Logística con Agentes de IA (Coolblue)'
description: 'Implementación de un sistema multi-agente para la optimización de última milla y gestión predictiva de inventario para Coolblue, Países Bajos.'
publishDate: 2024-03-10
tech: ['Python', 'Agentic Workflows', 'Deep Learning', 'Google Cloud Platform', 'Power BI']
metrics:
  - label: 'Eficiencia de Entrega'
    value: '+20%'
  - label: 'Reducción de Merma'
    value: '15%'
github: 'https://github.com/Michael-Castano/coolblue-ai-logistics'
featured: false
---

## Descripción del Proyecto

Proyecto de prestación de servicios para **Coolblue** (gigante de e-commerce neerlandés) enfocado en la transformación de su cadena de suministro mediante el uso de **Agentes de Inteligencia Artificial** y modelos de **Deep Learning** para la predicción de demanda estacional.

## Contexto del Proyecto

El crecimiento acelerado de Coolblue requería una solución capaz de manejar la complejidad logística de sus almacenes automatizados y su flota de entrega "CoolblueBezorgt". El objetivo era minimizar los tiempos de entrega y optimizar el espacio en los centros de distribución.

## Solución Tecnológica

### 1. Orquestación de Agentes de IA

Diseñé un flujo de trabajo agéntico que coordina:

- **Agente de Demanda**: Predice picos de ventas basándose en datos históricos y tendencias de mercado en el Benelux.
- **Agente de Inventario**: Sugiere niveles de stock óptimos para cada centro regional de distribución.
- **Agente de Ruteo**: Optimiza dinámicamente las rutas de entrega basándose en el tráfico y ventanas horarias de los clientes.

### 2. Modelado Predictivo (ML/DL)

Implementé redes neuronales recurrentes (LSTM) para la predicción de series temporales de alta precisión.

```python
import tensorflow as tf
from tensorflow.keras.layers import LSTM, Dense

# Modelo de predicción de demanda de última milla
model = tf.keras.Sequential([
    LSTM(64, input_shape=(n_steps, n_features)),
    Dense(1)
])
```

### 3. Visualización y BI

Dashboard avanzado en **Power BI** conectado a Google BigQuery, permitiendo a los gerentes de logística visualizar:

- El estado de la flota en tiempo real.
- Predicciones de cuello de botella en almacenes.
- Análisis de costo por kilómetro recorrido.

## Resultados y Valor Agregado

- ✅ **20% de incremento** en la eficiencia de las entregas diarias.
- ✅ **15% de reducción** en productos con exceso de stock (merma financiera).
- ✅ **Automatización total** del proceso de asignación de rutas, ahorrando 4 horas diarias de gestión manual.
- ✅ **Insights estratégicos** para la expansión de nuevos centros de distribución en la región norte de Holanda.

## Tecnologías Utilizadas

- **Agentes**: AutoGen, LangGraph.
- **Data Science**: TensorFlow, Pandas, SQLAlchemy.
- **Cloud**: Google Cloud Platform (Vertex AI, BigQuery).
- **BI**: Power BI, DAX avanzado.
