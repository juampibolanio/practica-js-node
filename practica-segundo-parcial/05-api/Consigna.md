📘 PARCIAL MODELO 2 – “El Laboratorio de los Autómatas Errantes”
📂 Archivo de datos

Toda la información se almacena en un único archivo:

lab.json

Contenido inicial:

{
  "automatons": [],
  "missions": [],
  "battles": []
}

1. Contexto General

En el laboratorio clandestino “Machina Arcana” se construyen Autómatas inteligentes capaces de mejorar sus capacidades mediante entrenamiento, misiones y batallas.

Tu API debe permitir:

Administrar Autómatas

Administrar Misiones

Realizar intentos de misión con reglas lógicas

Realizar batallas de procesamiento

Controlar energía, nivel, experiencia y componentes

Toda la persistencia se realiza exclusivamente en lab.json usando fs.promises.

2. Reglas del Sistema
2.1 Autómata

Cada Autómata posee:

id

modelName

level (1 inicial)

xp (0 inicial)

energy (100 inicial)

components: array de objetos { name, efficiency }

protocols: array de palabras (strings)

2.2 Fórmula de Subida de Nivel

Cada vez que cambie la XP, debe evaluarse:

XP requerida = level * 90

Si xp >= (level * 90):
    level += 1
    xp = xp - (level * 90)


Puede subir varios niveles de forma encadenada.

2.3 Misiones

Una misión contiene:

id

title

complexity (1 a 10)

energyCost

rewardFormula (string de fórmula matemática)

requiredProtocol (string)

Ejemplos de fórmulas válidas:

complexity * 10 + energyCost

complexity^2 + energyCost * 3

👉 Está prohibido usar eval().

3. Intentar una Misión

Cuando un Autómata intenta una misión:

Debe tener energía suficiente.

Debe poseer el requiredProtocol.

Se descuenta energía:

automaton.energy -= energyCost


Se calcula XP mediante la fórmula matemática.

Si la misión es demasiado difícil:

Si complexity > level * 2:
    falló
    penalty = complexity * 4
    automaton.energy -= penalty
    no gana XP
    registrar "failed"


Si tiene éxito:

gana la XP resultante

evaluar si sube de nivel

registrar "success"

4. Sistema de Batallas

Dos autómatas luchan usando la fórmula:

power = level^2 + (xp / 4) + energy + sum(components.efficiency)


Reglas adicionales:

Ambos pierden 8 de energía luego de la batalla.

XP otorgada según la diferencia:

diff <= 15 → +25 XP  
diff <= 30 → +60 XP  
diff <= 60 → +100 XP  
diff > 60 → +150 XP


Luego se evalúa si suben de nivel.

Se registra el resultado de la batalla:

Ejemplo:

{
  "id": 1,
  "automaton1": "A-91",
  "automaton2": "MK-3",
  "winner": "A-91",
  "power1": 220,
  "power2": 150,
  "timestamp": "2025-11-10T12:00:00.000Z"
}

5. Endpoints Obligatorios
AUTÓMATAS
Crear autómata

POST /automatons X

Listar autómatas + filtros

GET /automatons X

Filtros opcionales:

protocol

name (fragmento de nombre)

minLevel

maxLevel

Modificar energía X

PATCH /automatons/:id/energy

Modificar componentes X

PATCH /automatons/:id/components X

Body:

{
  "action": "add" | "remove",
  "items": [ { "name": "...", "efficiency": number } ]
}

MISIONES
Crear misión

POST /missions

Listar misiones + filtros

GET /missions

Intentar misión

POST /missions/:missionId/attempt/:automatonId

BATALLAS
Crear batalla

POST /battles

Listar batallas + filtros

GET /battles

Filtros opcionales:

winner

date (YYYY-MM-DD)

minDifference

6. Requisitos Técnicos

Usar fs.promises para leer y escribir lab.json.

Arquitectura obligatoria:

routes → controllers → services → repositories


Middleware de autenticación con token simulado.

Middleware global de manejo de errores.

Manejar JSON corrupto de forma correcta.

Crear una función util para evaluar fórmulas matemáticas.

No duplicar lógica entre controller y service.

Prohibido el uso de eval().

Prohibido usar console.log en la versión final.

7. Puntaje Sugerido
Sección	Puntos
Arquitectura + persistencia	20
Autómatas	20
Misiones	25
Intento de misión	15
Batallas	15
Errores & Calidad de Código	5
Total	100