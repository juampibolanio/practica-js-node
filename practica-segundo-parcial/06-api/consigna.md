📘 PARCIAL MODELO 3 – “La Orden de los Alquimistas Cinéticos”
# Parcial Modelo 3 – “La Orden de los Alquimistas Cinéticos”
## Archivo de datos

Toda la información debe almacenarse en un único archivo JSON:

**alchemy.json**

Contenido inicial:

```json
{
  "alchemists": [],
  "trials": [],
  "duels": []
}

1. Contexto General

El mundo de “Aurelia Prima” es controlado por la Orden de los Alquimistas Cinéticos, expertos en manipular energía, catalizadores y fórmulas matemáticas para alterar la realidad.

Debes desarrollar una API REST capaz de:

Administrar Alquimistas

Administrar Pruebas Alquímicas

Permitir que Alquimistas enfrenten pruebas lógicas

Realizar duelos de energía cinética

Controlar niveles, XP, energía, catalizadores, afinidades mágicas

Todo con persistencia en alchemy.json, usando fs.promises.

2. Reglas del Sistema
2.1 Alquimista

Atributos:

id

name

rank (nivel, inicia en 1)

xp (0 inicial)

energy (120 inicial)

affinities: array de palabras (ej: fuego, hielo, metal)

catalysts: array de objetos { name, potency }

2.2 Fórmula de Subida de Nivel

Cada vez que cambie la XP:

XP requerida = rank * 100

Mientras xp >= (rank * 100):
    xp -= rank * 100
    rank += 1


Puede subir varios niveles encadenados.

2.3 Pruebas Alquímicas

Una prueba posee:

id

title

difficulty (1 a 12)

energyCost

rewardFormula (string matemática)

requiredAffinity (string)

Ejemplos:

difficulty * 12 + energyCost * 3

difficulty^2 + energyCost

difficulty * 5 + energyCost^2

👉 No se permite eval().

3. Intentar una Prueba

Cuando un Alquimista intenta una prueba:

Debe tener energía suficiente.

Debe tener la afinidad requerida.

Se descuenta:

alchemist.energy -= energyCost


Se calcula XP mediante la fórmula.

Si la prueba es demasiado difícil:

Si difficulty > rank * 2.5:
    falló
    penalty = difficulty * 5
    alchemist.energy -= penalty
    no gana XP
    registrar intento "failed"


Si completa:

gana XP

evaluar subida de nivel

registrar intento "success"

4. Duelos Cinéticos

Los Alquimistas pueden enfrentarse usando el siguiente cálculo:

power = rank^3 + (xp / 3) + energy + sum(catalysts.potency)


Reglas:

Ambos pierden 15 de energía luego del duelo.

XP otorgada por diferencia:

diff <= 20 → +30 XP  
diff <= 40 → +70 XP  
diff <= 80 → +120 XP  
diff > 80 → +180 XP


Evaluar si sube de nivel

Registrar el duelo con formato:

{
  "id": 3,
  "alchemist1": "Orion",
  "alchemist2": "Lyra",
  "winner": "Lyra",
  "power1": 310,
  "power2": 350,
  "timestamp": "2025-11-13T14:00:00.000Z"
}

5. Endpoints Obligatorios
ALQUIMISTAS
Crear alquimista

POST /alchemists

Listar alquimistas con filtros

GET /alchemists

Filtros opcionales:

affinity=...

name=... (fragmento)

minRank=...

maxRank=...

Modificar energía

PATCH /alchemists/:id/energy

Body:

{ "energy": number }

Modificar catalizadores

PATCH /alchemists/:id/catalysts

Body:

{
  "action": "add" | "remove",
  "items": [
    { "name": "...", "potency": number }
  ]
}

PRUEBAS ALQUÍMICAS
Crear prueba

POST /trials

Listar pruebas con filtros

GET /trials

Filtros:

affinity

difficulty

Intentar una prueba

POST /trials/:trialId/attempt/:alchemistId

DUELOS CINÉTICOS
Crear duelo

POST /duels

Body esperado:

{
  "alchemist1": "id",
  "alchemist2": "id"
}

Listar duelos con filtros

GET /duels

Filtros:

winner

date (YYYY-MM-DD)

minDifference

6. Requisitos Técnicos

Debe usarse fs.promises para manipular alchemy.json

Arquitectura obligatoria:

routes → controllers → services → repositories


Middleware global de errores

Middleware de autenticación con token simulado

Manejar JSON corrupto

Debe implementarse una función util:
calculateFormula(formula, vars)

No duplicar lógica entre controller y servicio

No usar eval()

No usar console.log en la versión final

7. Puntaje Sugerido
Sección	Puntos
Arquitectura + persistencia	20
Alquimistas	20
Pruebas Alquímicas	25
Intento de prueba	15
Duelos Cinéticos	15
Errores & Calidad	5
TOTAL	100