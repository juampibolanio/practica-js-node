# 📘 Parcial Final – **Los Forjadores del Cristal Arcano**

Toda la información del sistema debe almacenarse en un único archivo JSON:

```
arcane.json
```

Estructura inicial:

```json
{
  "smiths": [],
  "quests": [],
  "duels": []
}
```

---

# 🔮 Reglas del Sistema

## 1. Forjadores (Smiths)

Cada forjador posee:

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único |
| `name` | Nombre del forjador |
| `tier` | Nivel (inicia en **1**) |
| `xp` | Experiencia (inicia en **0**) |
| `energy` | Energía (inicia en **100**) |
| `runes` | Array de *strings* |
| `crystals` | Array de objetos `{ name, power }` |

---

### ⭐ Subida de Nivel

```
need = tier * 80

mientras xp >= need:
    xp -= need
    tier++
```

El forjador puede subir varios niveles consecutivos si acumula suficiente XP.

---

## 2. Misiones (Quests)

Una misión posee:

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único |
| `title` | Título de la misión |
| `intensity` | Valor entre **1 y 10** |
| `energyCost` | Energía que consume |
| `rewardFormula` | Fórmula matemática segura |
| `requiredRune` | Runa obligatoria |

Ejemplos de fórmulas válidas:

- `intensity * 7 + energyCost * 2`
- `intensity^2 + energyCost`

---

## 3. Intento de Misión

### ✔ Requisitos

1. Debe tener la **runa requerida**  
2. Debe poseer **energía suficiente**

### 🔻 Costos

```
smith.energy -= energyCost
```

### ⭐ Cálculo de XP

Se calcula evaluando `rewardFormula` mediante un evaluador seguro.

### ❌ Fallo

Una misión falla si:

```
intensity > tier * 2
```

Entonces:

- Pierde energía adicional: `intensity * 4`
- Gana **0 XP**
- Registrar intento como “failed”

### ✅ Éxito

- Gana XP según la fórmula  
- Se evalúa si sube de nivel  
- Registrar intento como “success”  

---

## 4. Duelos

### ⚔ Fórmula de Poder

```
power = tier^2 + (xp / 5) + energy + sum(crystals.power)
```

### 🔥 Reglas del duelo

- Ambos forjadores pierden **10 de energía**
- Gana quien tenga mayor `power`

### 🎁 Recompensa de XP

Según diferencia de poder (`diff`):

| Diferencia | XP Ganada |
|-----------|-----------|
| ≤ 10 | +20 XP |
| ≤ 25 | +50 XP |
| ≤ 50 | +90 XP |
| > 50 | +130 XP |

El duelo debe registrarse incluyendo:

- IDs de participantes
- Winner
- Power de ambos
- Timestamp

---

# 🔗 Endpoints

## 🛠 SMITHS (`/smiths`)

| Método | Ruta | Descripción |
|--------|-------|-------------|
| POST | `/smiths` | Crear forjador |
| GET | `/smiths` | Listar (filtros: `rune`, `name`, `minTier`, `maxTier`) |
| PATCH | `/smiths/:id/energy` | Modificar energía |
| PATCH | `/smiths/:id/crystals` | Modificar cristales |

---

## 📜 QUESTS (`/quests`)

| Método | Ruta | Descripción |
|--------|-------|-------------|
| POST | `/quests` | Crear misión |
| GET | `/quests` | Listar |
| POST | `/quests/:questId/attempt/:smithId` | Intentar misión |

---

## ⚔ DUELOS (`/duels`)

| Método | Ruta | Descripción |
|--------|-------|-------------|
| POST | `/duels` | Ejecutar duelo |
| GET | `/duels` | Listar (filtros: `winner`, `date`, `minDiff`) |

---

# 📁 Fin del Documento
