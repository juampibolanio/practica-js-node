# 🧪 Parcial Modelo 4 – “La Liga de los Ingenieros Nexus”

## 🗂 Archivo de datos

Toda la información debe almacenarse en un único archivo JSON:

**nexus.json**

Contenido inicial:

```json
{
  "engineers": [],
  "robots": [],
  "missions": [],
  "combats": []
}
1. Contexto General
En el mundo futurista de NeoAstra, la élite tecnológica conocida como La Liga de los Ingenieros Nexus desarrolla y controla robots avanzados llamados Nexus Units.

Los ingenieros realizan misiones, mejoran robots y participan en combates tecnológicos.

Tu tarea es desarrollar una API REST completa, con:

Persistencia en nexus.json

Cálculos matemáticos

Subida de nivel

Energía / Durabilidad

Combates Nexus–vs–Nexus

Fórmulas matemáticas dinámicas

Arquitectura profesional (routes, controllers, services, repository)

2. Reglas del Sistema
2.1 Ingenieros (Engineers)
Cada ingeniero posee:

id

name

level (inicia en 1)

xp (inicia en 0)

skillset: array de strings

robots: array de IDs de robots asignados

Subida de nivel
Cada vez que cambie la XP:

xpNecesaria = level * 50

mientras xp >= xpNecesaria:
    xp -= xpNecesaria
    level++

2.2 Robots Nexus (Robots)
Cada robot posee:

id

model

durability (inicia en 100)

powerBase (10 a 40)

components: array de objetos:

{ "name": string, "boost": number }

Poder total del robot

power = powerBase + sum(boosts) + (durability / 2)
2.3 Misiones Tecnológicas (Missions)
Una misión posee:

id

name

complexity (1 a 10)

energyCost

rewardFormula (string)

requiredSkill

Ejemplos de fórmulas válidas:

"complexity * 12 + energyCost * 2"

"complexity^2 + energyCost"

"complexity * 5 + energyCost^3"

No se permite eval().
Se debe convertir ^ a ** antes de evaluar.

3. Intentar una Misión
Cuando un ingeniero asigna un robot a una misión:

3.1 Reglas
El ingeniero debe poseer la skill requerida.

El robot pierde energía:

Copiar código
robot.durability -= energyCost
Se calcula la XP mediante:

scss
Copiar código
calculateFormula(rewardFormula, { complexity, energyCost })
Si la misión es demasiado difícil:

yaml
Copiar código
Si complexity > engineer.level * 2:
    misión = failed
    robot.durability -= complexity * 5
    no gana XP
Si tiene éxito:

el ingeniero gana XP

evaluar subida de nivel

opcional: se puede agregar un componente bonus al robot

4. Combates Nexus–vs–Nexus (Combats)
Dos robots luchan entre sí.

4.1 Cálculo del poder
ini
Copiar código
robotPower = powerBase + sum(components.boost) + (durability / 2)
4.2 Reglas del combate
Ambos robots pierden 10 de durability después del combate.

El ganador se decide por mayor poder.

XP otorgada según diferencia:

powershell
Copiar código
diff <= 20 → +15 XP
diff <= 40 → +40 XP
diff <= 80 → +70 XP
diff > 80 → +120 XP
La XP se asigna al ingeniero dueño del robot ganador, y luego se evalúa subida de nivel.

5. Endpoints Obligatorios
5.1 ENGINEERS
Crear ingeniero X
POST /engineers

Listar ingenieros con filtros
GET /engineers X

Filtros opcionales:

skill=...

name=... (fragmento)

minLevel=...

maxLevel=...

Modificar XP del ingeniero
PATCH /engineers/:id/xp X

5.2 ROBOTS
Crear robot
POST /robots

Listar robots
GET /robots

Modificar componentes
PATCH /robots/:id/components

Body:

{
  "action": "add" | "remove",
  "items": [
    { "name": "...", "boost": number }
  ]
}
5.3 MISIONES
Crear misión
POST /missions

Listar misiones
GET /missions

Asignar robot a misión
POST /missions/:missionId/assign/:engineerId/:robotId

5.4 COMBATES
Crear combate
POST /combats

Body:

json
Copiar código
{
  "robot1": "id",
  "robot2": "id"
}
Listar combates
GET /combats

Filtros:

winner=...

date=YYYY-MM-DD

minDifference=...

6. Requisitos Técnicos
Usar fs.promises para cargar/guardar nexus.json

Arquitectura obligatoria:

routes → controllers → services → repository
Middleware:

autenticación con token fijo

manejo global de errores

middleware logger opcional

Crear una función util:
calculateFormula(formula, vars)

No duplicar lógica

No usar eval()

No usar console.log() en la entrega final

Manejar errores si el JSON está corrupto

7. Puntaje Sugerido
Sección	Puntos
Arquitectura + persistencia	20
Ingenieros	20
Robots Nexus	20
Misiones	20
Combates	15
Errores & Calidad	5
TOTAL	100