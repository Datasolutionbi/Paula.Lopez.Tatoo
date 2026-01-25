---
title: "SQL Avanzado para Data Analytics: Window Functions y CTEs"
description: "Domina window functions, CTEs y técnicas avanzadas de SQL para análisis de datos complejos sin salir de la base de datos."
publishDate: 2026-01-18
category: "Technical"
tags: ["SQL", "Data Analytics", "PostgreSQL", "Optimization"]
author: "Andres Rivera"
---

# SQL Avanzado para Data Analytics

Como analista de datos, SQL es tu herramienta más poderosa. Más allá de `SELECT * FROM`, existen técnicas avanzadas que transforman SQL en un lenguaje de análisis completo.

## Window Functions: El Superpoder de SQL

Las window functions te permiten hacer cálculos sobre "ventanas" de filas sin colapsar el resultado como `GROUP BY`.

### Ranking y Ordenamiento

```sql
-- Top 3 productos por ventas en cada categoría
SELECT 
    category,
    product_name,
    sales,
    RANK() OVER (PARTITION BY category ORDER BY sales DESC) as rank
FROM products
QUALIFY rank <= 3;  -- Snowflake/BigQuery
-- En PostgreSQL, envuelve en CTE y filtra
```

### Moving Averages

```sql
-- Media móvil de 7 días
SELECT 
    date,
    daily_sales,
    AVG(daily_sales) OVER (
        ORDER BY date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7days
FROM sales_daily
ORDER BY date;
```

### Comparaciones Temporales

```sql
-- Ventas vs mes anterior
SELECT 
    date,
    sales,
    LAG(sales, 1) OVER (ORDER BY date) as prev_month_sales,
    sales - LAG(sales, 1) OVER (ORDER BY date) as growth,
    ROUND(
        100.0 * (sales - LAG(sales, 1) OVER (ORDER BY date)) / 
        NULLIF(LAG(sales, 1) OVER (ORDER BY date), 0),
        2
    ) as growth_pct
FROM monthly_sales;
```

## CTEs (Common Table Expressions)

Los CTEs hacen tu SQL legible y mantenible.

### CTE Básico

```sql
WITH monthly_totals AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(amount) as total_sales
    FROM orders
    GROUP BY 1
)
SELECT 
    month,
    total_sales,
    total_sales / SUM(total_sales) OVER () as pct_of_total
FROM monthly_totals
ORDER BY month;
```

### CTEs Recursivos

Para datos jerárquicos (org charts, categorías):

```sql
WITH RECURSIVE employee_hierarchy AS (
    -- Anchor: CEO
    SELECT 
        employee_id,
        name,
        manager_id,
        1 as level,
        name as path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive: empleados reportando a cada nivel
    SELECT 
        e.employee_id,
        e.name,
        e.manager_id,
        eh.level + 1,
        eh.path || ' > ' || e.name
    FROM employees e
    INNER JOIN employee_hierarchy eh 
        ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy
ORDER BY level, path;
```

## Análisis de Cohortes

```sql
WITH first_purchase AS (
    SELECT 
        customer_id,
        DATE_TRUNC('month', MIN(order_date)) as cohort_month
    FROM orders
    GROUP BY 1
),
monthly_activity AS (
    SELECT 
        fp.cohort_month,
        DATE_TRUNC('month', o.order_date) as activity_month,
        COUNT(DISTINCT o.customer_id) as active_customers
    FROM first_purchase fp
    INNER JOIN orders o ON fp.customer_id = o.customer_id
    GROUP BY 1, 2
)
SELECT 
    cohort_month,
    activity_month,
    active_customers,
    FIRST_VALUE(active_customers) OVER (
        PARTITION BY cohort_month 
        ORDER BY activity_month
    ) as cohort_size,
    ROUND(
        100.0 * active_customers / 
        FIRST_VALUE(active_customers) OVER (
            PARTITION BY cohort_month 
            ORDER BY activity_month
        ),
        2
    ) as retention_rate
FROM monthly_activity
ORDER BY cohort_month, activity_month;
```

## Pivoting Avanzado

### Crosstab Dinámico

```sql
-- PostgreSQL
SELECT * FROM CROSSTAB(
    'SELECT customer_id, product_category, SUM(amount)
     FROM orders
     GROUP BY 1, 2
     ORDER BY 1',
    'SELECT DISTINCT product_category FROM orders ORDER BY 1'
) AS ct(customer_id INT, electronics NUMERIC, clothing NUMERIC, food NUMERIC);
```

### PIVOT en SQL Server

```sql
SELECT *
FROM (
    SELECT customer_id, product_category, amount
    FROM orders
) src
PIVOT (
    SUM(amount)
    FOR product_category IN ([Electronics], [Clothing], [Food])
) pvt;
```

## Optimización de Queries

### Usa EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT ...
FROM large_table
WHERE ...;
```

### Índices Estratégicos

```sql
-- Índice compuesto para query común
CREATE INDEX idx_orders_customer_date 
ON orders(customer_id, order_date DESC);

-- Índice parcial para datos activos
CREATE INDEX idx_active_orders 
ON orders(customer_id, order_date)
WHERE status = 'active';
```

### Materializa Subconsultas Costosas

```sql
-- En lugar de subquery repetida
CREATE MATERIALIZED VIEW customer_stats AS
SELECT 
    customer_id,
    COUNT(*) as order_count,
    SUM(amount) as lifetime_value,
    MAX(order_date) as last_order_date
FROM orders
GROUP BY customer_id;

-- Refresca periódicamente
REFRESH MATERIALIZED VIEW customer_stats;
```

## Análisis de Funnels

```sql
WITH funnel_steps AS (
    SELECT 
        user_id,
        MAX(CASE WHEN event = 'page_view' THEN 1 ELSE 0 END) as step1_view,
        MAX(CASE WHEN event = 'add_to_cart' THEN 1 ELSE 0 END) as step2_cart,
        MAX(CASE WHEN event = 'checkout' THEN 1 ELSE 0 END) as step3_checkout,
        MAX(CASE WHEN event = 'purchase' THEN 1 ELSE 0 END) as step4_purchase
    FROM events
    WHERE event_date >= CURRENT_DATE - 30
    GROUP BY user_id
)
SELECT 
    SUM(step1_view) as views,
    SUM(step2_cart) as add_to_cart,
    SUM(step3_checkout) as checkouts,
    SUM(step4_purchase) as purchases,
    ROUND(100.0 * SUM(step2_cart) / NULLIF(SUM(step1_view), 0), 2) as view_to_cart_rate,
    ROUND(100.0 * SUM(step3_checkout) / NULLIF(SUM(step2_cart), 0), 2) as cart_to_checkout_rate,
    ROUND(100.0 * SUM(step4_purchase) / NULLIF(SUM(step3_checkout), 0), 2) as checkout_to_purchase_rate
FROM funnel_steps;
```

## Best Practices

### 1. Nombra tus CTEs descriptivamente
```sql
-- ❌ Mal
WITH t1 AS (...), t2 AS (...)

-- ✅ Bien
WITH monthly_revenue AS (...), 
     customer_segments AS (...)
```

### 2. Comenta queries complejas
```sql
-- Calculate customer lifetime value (CLV) 
-- as sum of all orders in last 365 days
WITH customer_orders AS (...)
```

### 3. Evita SELECT *
```sql
-- ❌ Mal
SELECT * FROM large_table JOIN another_table ...

-- ✅ Bien
SELECT t1.id, t1.name, t2.amount FROM large_table t1 ...
```

### 4. Usa LIMIT en desarrollo
```sql
-- Desarrollo
SELECT ... FROM ... LIMIT 1000;

-- Producción (sin LIMIT)
SELECT ... FROM ...;
```

## Conclusión

SQL avanzado elimina la necesidad de exportar datos a Python/R para análisis complejos. Domina estas técnicas y realiza el 90% de tu análisis directamente en la base de datos.

**Recursos:**
- [PostgreSQL Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [SQL Performance Explained](https://sql-performance-explained.com/)
- [Modern SQL](https://modern-sql.com/)

¿Qué técnica SQL te ha sorprendido más? ¡Comparte en los comentarios!
