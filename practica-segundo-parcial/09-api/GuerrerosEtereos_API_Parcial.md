# 📜 Parcial – Desarrollo de API  
## **La Orden de los Guerreros Etéreos**

Tu tarea es desarrollar una **API RESTful** para administrar un sistema de **Guerreros Etéreos** utilizando **Node.js** y **Express**.  
Toda la información debe almacenarse y gestionarse desde un único archivo **JSON** (`spirit.json`).

---

## 1. Contexto General y Estructura de Datos

En el reino sagrado de **Elyndor**, los Guerreros Etéreos administran su energía astral, completan **pruebas**, obtienen **afinidades mágicas** y participan en **duelos astrales**.

### 💾 Archivo de Persistencia (`spirit.json`)

```json
{
  "warriors": [],
  "trials": [],
  "duels": []
}
```

---

## 2. Reglas del Sistema

### 2.1 Guerrero Etéreo (Warrior) 🛡️

| Campo | Tipo | Descripción | Valor Inicial |
|------|------|-------------|---------------|
| `id` | String/Number | Identificador único | N/A |
| `name` | String | Nombre del guerrero | N/A |
| `rank` | Number | Nivel o rango | **1** |
| `xp` | Number | Experiencia actual | **0** |
| `energy` | Number | Energía astral | **120** |
| `affinities` | Array<String> | Afinidades mágicas | `[]` |
| `artifacts` | Array<Object> | Objetos `{ name, power }` | `[]` |

---

### 2.2 Fórmula de Subida de Nivel (Level Up)

Esta lógica se aplica **cada vez que la XP del guerrero cambie**.

**XP Requerida:**

```
XP = rank * 60
```

**Proceso:**

```javascript
while (xp >= rank * 60) {
  xp -= rank * 60;
  rank++;
}
```

---

### 2.3 Pruebas Astrales (Trials) ✨

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String/Number | Identificador único |
| `title` | String | Título de la prueba |
| `difficulty` | Number | 1 a 12 |
| `energyCost` | Number | Energía necesaria |
| `rewardFormula` | String | Fórmula matemática segura |
| `requiredAffinity` | String | Afinidad necesaria |

**Fórmulas válidas:**

- `difficulty * 10 + energyCost * 3`
- `difficulty^2 + energyCost`
- `difficulty * energyCost + 5`

---

## 3. Intento de Prueba  
### `POST /trials/:trialId/attempt/:warriorId`

### 3.1 Reglas Previas

1. Debe poseer la afinidad requerida.  
2. Debe tener energía suficiente.  
3. Se descuenta energía: `warrior.energy -= trial.energyCost`.  
4. Se evalúa la fórmula.

---

### 3.2 Evaluación

**Falla si:**

```
difficulty > rank * 2.2
```

#### ❌ Failed
- Penalización: `difficulty * 4`
- XP ganada: `0`

#### ✅ Success
- Gana XP.
- Aplica **level up**.

---

## 4. Duelos Astrales ⚔️

### 4.1 Poder

```
power = rank^2 + (xp / 4) + energy + sum(artifacts.power)
```

### 4.2 Reglas

- Ambos pierden `8` de energía.  
- Gana el de mayor `power`.  
- XP por diferencia:

| diff | XP |
|------|----|
| ≤ 12 | +25 |
| 12–30 | +55 |
| 30–60 | +85 |
| > 60 | +140 |

Ejemplo:

```json
{
  "id": 1,
  "warrior1": "id",
  "warrior2": "id",
  "winner": "id",
  "power1": 180,
  "power2": 205,
  "timestamp": "2025-11-19T18:00:00.000Z"
}
```

---

## 5. Endpoints

### `/warriors`
- POST crear  
- GET listar + filtros  
- PATCH energía  
- PATCH artefactos  

### `/trials`
- POST crear  
- GET listar  
- POST attempt  

### `/duels`
- POST duelo  
- GET listar  

---

## 6. Requisitos Técnicos

- No usar `eval()`.  
- Utilidad para evaluar fórmulas.  
- Lógica sólo en servicios.  
- Sin `console.log`.  
- Manejar JSON vacío/corrupto.  
- Arquitectura modular.  
