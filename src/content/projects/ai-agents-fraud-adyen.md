---
title: 'Sistema de Agentes IA para Detección de Fraude (Adyen)'
description: 'Arquitectura de agentes inteligentes y modelos de Machine Learning para la mitigación proactiva de fraude en transacciones financieras globales en los Países Bajos.'
publishDate: 2024-05-20
tech: ['Python', 'LangChain', 'Machine Learning', 'OpenAI API', 'Power BI', 'SQL Server']
metrics:
  - label: 'Detección de Fraude'
    value: '95%'
  - label: 'Reducción Falsos Positivos'
    value: '40%'
github: 'https://github.com/Michael-Castano/ai-fraud-agents'
featured: true
---

## Descripción del Proyecto

Como consultor externo para **Adyen** (empresa líder en pagos tecnológicos con sede en Ámsterdam), desarrollé una solución avanzada que combina **Machine Learning** tradicional con **Agentes de Inteligencia Artificial** para automatizar el triaje de alertas de fraude y mejorar la precisión en la detección de anomalías transaccionales.

## Desafío del Negocio

El sistema anterior dependía de reglas estáticas y modelos de ML que generaban un alto volumen de falsos positivos, saturando al equipo de analistas de riesgo. Se requería:

- **Reducir la carga cognitiva** de los analistas.
- **Identificar nuevos patrones** de fraude en tiempo real.
- **Automatizar la toma de decisiones** en casos de bajo riesgo.
- **Explicabilidad** de por qué una transacción fue marcada como fraudulenta.

## Solución Implementada

### 1. Arquitectura de Agentes Inteligentes (Multi-Agent System)

Utilicé **LangChain** para orquestar múltiples agentes con roles específicos:

- **Agente Explorador**: Analiza el historial del usuario y patrones de comportamiento.
- **Agente de Riesgo**: Evalúa la transacción actual frente a modelos de Random Forest y XGBoost.
- **Agente de Explicabilidad**: Genera una narrativa en lenguaje natural para el analista, detallando los factores de riesgo encontrados.

### 2. Modelado de Machine Learning

Implementé modelos de aprendizaje supervisado para la clasificación inicial:

```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from sklearn.ensemble import IsolationForest

# Detección de anomalías en tiempo real
detector = IsolationForest(contamination=0.01, random_state=42)
anomalies = detector.fit_predict(transaction_data)
```

### 3. Dashboard de Control BI

Desarrollé un dashboard en **Power BI** para la alta gerencia que visualiza:

- Tasa de ahorro por fraude evitado.
- Rendimiento de los agentes de IA.
- Distribución geográfica de intentos de ataque.

## Resultados Impactantes

- ✅ **95% de precisión** en la detección de anomalías complejas.
- ✅ **40% de reducción** en falsos positivos, optimizando el tiempo del equipo de riesgo.
- ✅ **Decisión automática** en menos de 2 segundos para transacciones de bajo valor.
- ✅ **Escalabilidad** para procesar millones de transacciones diarias en el mercado europeo.

## Tecnologías Utilizadas

- **AI Agents**: LangChain, OpenAI (GPT-4o), Agentes de Razonamiento.
- **Machine Learning**: Scikit-learn (XGBoost, Isolation Forest).
- **Backend/Data**: Python, SQL Server (Azure), Fast API.
- **BI**: Power BI (Visualización de Insights de IA).
