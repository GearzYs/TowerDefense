# Tower Defense

## How to run it ?

Click on this link :
If you want to run it locally, symply clone this git and start a new LiveServer on it.

## Règles

Un jeu de tower defense, comporte plusieurs éléments et règles. Voici une explication simplifiée des principes de base :

Objectif du jeu : Le joueur doit défendre la partie gauche de son écran contre l'invasion de vagues successives de zombies.

Placement des tours : Le joueur dispose de deux types de tour qu'il peut placer le long du chemin emprunté par les ennemis. Attention ! Les tours peuvent seulement tirer à la verticale. Chaque tour a des caractéristiques spécifiques, la basique, qui coute 100, possède 100 points de vie et tire des balles lentes faisant des dégats de 15 aux énemies, tandis que l'autre coute 150, possède 200 points de vie et tire des balles rapides faisant des dégats de 30 aux énemies.

Ressources : Le joueur gagne des ressources qu'il peut dépenser pour placer de nouvelles tours.

Vagues d'ennemis : Les ennemis apparaissent de plus en plus nombreux au fil du jeu jusqu'à atteindre le niveau 100 (MAX) et avancent toujours tout droit. Deux types de zombies existent, un lent avec 100 points de vie rapportant 100 ressources et un rapide avec 150 points de vie rapportant 150 ressources.

Stratégie : Le joueur doit élaborer une stratégie efficace pour choisir quelles tours placer où, en fonction des types d'ennemis et de leurs points forts/faiblesses.

Échec et succès : Si les ennemis atteignent le point de destination sans être arrêtés, le joueur échoue la partie. À l'inverse, si le joueur réussit à survivre à toutes les vagues d'ennemis, il gagne la partie.

## Le modèle utilisé : MVC

Le modèle MVC (Modèle-Vue-Contrôleur) est un motif d'architecture logicielle largement utilisé dans le développement d'applications informatiques. Il divise une application en trois composants principaux pour organiser le code de manière modulaire et faciliter la gestion et la maintenance du logiciel. Voici une brève explication de chaque composant du modèle MVC :

1) Modèle (Model) :

- Le modèle représente la structure des données, la logique métier et les règles de traitement des données.
- Il est responsable de la gestion des données et de l'interaction avec la base de données, le cas échéant.
- Le modèle ne doit pas connaître ni dépendre de la vue ou du contrôleur.

2) Vue (View) :

- La vue est responsable de l'affichage des données au sein de l'interface utilisateur.
- Elle observe les changements dans le modèle et met à jour l'interface utilisateur en conséquence.
- La vue ne doit pas contenir de logique métier ; elle se concentre uniquement sur l'affichage.

3) Contrôleur (Controller) :

- Le contrôleur agit comme un intermédiaire entre le modèle et la vue.
- Il reçoit les entrées de l'utilisateur, interprète ces entrées, met à jour le modèle en conséquence et met à jour la vue.
- Il contient la logique métier et orchestre les interactions entre le modèle et la vue.

Le modèle MVC favorise donc la séparation des préoccupations (separation of concerns) en organisant le code en trois composants distincts. Cela rend le code plus modulaire, évite les couplages indésirables entre les différentes parties de l'application et facilite la maintenance et l'évolution du logiciel.

## Organisation des fichiers et répertoires

./TowerDefense
![repoTree](https://i.ibb.co/mD8d077/image.png)

Le code est organisé sous le model MVC en plusieurs répertoires : assets, controllers, models, utilities, et views.
Chaque répertoire contient des fichiers spécifiques aux fonctions qu'ils exécutent dans le jeu.
Les fichiers dans les répertoires tels que controllers, models, utilities, et views contiennent des classes qui sont utilisées pour gérer différentes parties du jeu.

le fichier GameController.js organise la logique du jeu en utilisant des classes et des méthodes pour gérer les différentes entités et fonctionnalités du jeu de Tower Defense. La structure du code est modulaire, facilitant la maintenance et l'extension du jeu. Il constitue le fichier principal qui importe plusieurs modules pour gérer les mises à jour, la construction de tours, les collisions, l'affichage d'entités, etc.

La classe GameController a un constructeur qui prend de nombreux paramètres liés aux différentes entités du jeu, aux éléments de la vue, aux sons, et aux variables de jeu.

La classe contient de nombreuses méthodes qui gèrent différents aspects du jeu.
handleMouseClick : Gère les clics de souris pour placer des tours sur la grille du jeu.
handleGameGrid : Dessine les cellules de la grille du jeu.
handleBullets : Gère les balles tirées par les tours.
handleTowers : Gère les tours, leur affichage, leur mise à jour, et leurs interactions avec les zombies.
handleZombies : Gère les zombies, leur affichage, leur mise à jour, et les événements liés à leur élimination.
handleMoney : Gère l'affichage et la collecte de l'argent.
handleGameStatus : Gère l'affichage du score, de l'état du jeu (game over, victoire), et de l'argent.
updateGame : Méthode principale qui met à jour le jeu à chaque itération.

## Design patterns

### I - Singleton

![Singleton code](https://i.ibb.co/F7KLd55/code.png)

Dans le code de la classe CanvasView, le design pattern Singleton est utilisé pour garantir qu'il n'y a qu'une seule instance de la classe CanvasView dans l'application. Voici une explication détaillée de la façon dont le design pattern Singleton est mis en œuvre et de son utilité dans ce contexte :

Propriété statique instance : La classe CanvasView possède une propriété statique appelée instance. Cette propriété est utilisée pour stocker l'unique instance de la classe CanvasView qui sera créée.

```js
if (CanvasView.instance) {
  return CanvasView.instance;
}
```

Cette vérification est effectuée dans le constructeur de la classe avant la création d'une nouvelle instance. Si une instance existe déjà, le constructeur retourne cette instance existante, empêchant ainsi la création d'une nouvelle instance.

Contrôle de l'instanciation : Le constructeur de la classe vérifie si l'instance statique CanvasView.instance existe déjà. Si c'est le cas, il retourne cette instance existante, ce qui signifie qu'il n'y aura qu'une seule instance de CanvasView dans toute l'application.

```js
if (CanvasView.instance) {
  return CanvasView.instance;
}
```

Stockage de l'instance créée : Si aucune instance n'existe, le constructeur crée une nouvelle instance de la classe CanvasView et la stocke dans la propriété statique CanvasView.instance. Cela garantit que toute tentative de création d'une nouvelle instance de CanvasView renverra toujours la même instance unique.

```js
CanvasView.instance = this;
```

Utilité du design pattern Singleton dans ce contexte :

Économie de ressources : Le design pattern Singleton permet d'économiser des ressources en s'assurant qu'une seule instance de la classe CanvasView est créée et réutilisée. Cela est important dans des situations où la création d'instances multiples est coûteuse en termes de performances ou de consommation de mémoire.

Accès global : En garantissant qu'il n'y a qu'une seule instance de la classe CanvasView, le design pattern Singleton permet d'accéder facilement à cette instance de manière globale dans toute l'application. Cela facilite la gestion des états et des interactions avec l'objet CanvasView depuis différentes parties du code.

Le design pattern Singleton dans la classe CanvasView garantit qu'il n'y a qu'une seule instance de cette classe dans l'application, permettant des avantages tels que l'économie de ressources et un accès global cohérent à cette instance.

### II - Builder

![State](https://i.ibb.co/84HbPjn/code.png)

Ce code implémente le design pattern "Builder" (constructeur) dans le contexte d'une classe appelée TowerBuilder. Le design pattern Builder est utilisé pour construire un objet complexe étape par étape. Il permet de créer un objet avec une variété de configurations possibles sans avoir une classe constructor avec de nombreux paramètres, ce qui peut devenir difficile à gérer.

Voici comment le pattern Builder est utilisé dans ce code particulier :

Initialisation des paramètres : La classe TowerBuilder a un constructeur qui initialise des paramètres par défaut tels que la position (x et y), la taille de la cellule (cellSize), une liste de balles (bullets), une liste de types de tours (towersTypes), un type (type) et un fichier audio pour la tour (towerAudio).

Méthodes de configuration : La classe expose plusieurs méthodes, chacune correspondant à un paramètre de la classe Tower. Ces méthodes, telles que withPosition, withCellSize, withBullets, etc., prennent des valeurs en paramètres et les assignent aux propriétés de la classe. Chaque méthode renvoie l'instance actuelle du TowerBuilder après avoir effectué l'assignation. Cela permet l'appel en chaîne de ces méthodes.

Méthode build : La méthode build est appelée pour construire réellement l'objet final, dans ce cas, une instance de la classe Tower. Elle utilise les paramètres configurés à l'aide des méthodes de configuration pour créer un nouvel objet Tower avec les spécifications souhaitées.

Exemple d'utilisation :

```js
import TowerBuilder from './TowerBuilder.js';

const tower = new TowerBuilder()
  .withPosition(10, 20)
  .withCellSize(30)
  .withBullets(['Bullet1', 'Bullet2'])
  .withTowersTypes(['Type1', 'Type2'])
  .withType(1)
  .withTowerAudio('tower.mp3')
  .build();
```

Dans cet exemple, un objet Tower est créé avec des configurations spécifiques définies à l'aide des méthodes de configuration de TowerBuilder. Cela rend le processus de création d'un objet Tower plus flexible et lisible, en particulier lorsque vous avez plusieurs paramètres optionnels.

### III - Factory

![Factory](https://i.ibb.co/M9hC3m4/code.png)

Dans ce code, la classe Zombie est responsable de créer des instances de zombies avec différentes propriétés telles que la position, la taille, le type, la vitesse, etc. Cependant, il est bon d'utiliser le design pattern Factory pour déléguer la responsabilité de la création d'instances à une classe distincte appelée la "fabrique" (Factory).

Comment est utiliser le design pattern Factory :
Création d'une Factory :La classe ZombieFactory qui est responsable de la création d'instances de zombies.

```js
// ZombieFactory.js

class ZombieFactory {
  createZombie(canvas, verticalPosition, cellSize, zombieTypes) {
    const type = Math.floor(Math.random() * 1.5);
    const zombie = new Zombie(canvas, verticalPosition, cellSize, zombieTypes, type);
    return zombie;
  }
}
```

Utilisation de la Factory : Au lieu de créer directement une instance de Zombie dans votre code principal, on utilise la ZombieFactory pour créer des zombies.

```js
// Utilisation de la Factory dans GameController.js
this.zombies.push(this.ZombieFactory.createZombie(this.canvas,verticalPosition, this.cellSize, this.zombieTypes));
```

Pourquoi utiliser le design pattern Factory :
Encapsulation : La création d'objets est encapsulée dans la ZombieFactory, isolant la logique de création du reste du code. Cela rend le code dans GameController plus simple, car il n'a pas besoin de connaître les détails internes de la création d'une instance de zombie.

Abstraction : La Factory offre une abstraction au client, car il n'a pas besoin de se soucier des paramètres spécifiques nécessaires pour créer un zombie. Il suffit d'appeler la méthode createZombie avec les paramètres nécessaires, et la Factory gère le reste.

Flexibilité : Si vous devez modifier la façon dont les zombies sont créés (par exemple, en ajoutant de nouvelles propriétés ou en ajustant la logique de création), vous pouvez le faire à l'intérieur de la ZombieFactory sans affecter le reste du code client.

Réutilisabilité : La Factory peut être réutilisée dans d'autres parties de votre application ou dans d'autres classes, ce qui favorise la réutilisabilité du code.

L'utilisation du design pattern Factory dans ce contexte offre une manière structurée et flexible de créer des instances de zombies, favorisant l'encapsulation, l'abstraction, la flexibilité et la réutilisabilité du code.

### IV - Observer

![Observer](https://i.ibb.co/cb4cdrq/code.png)

Le design pattern Observer est utilisé dans ce code pour permettre à différentes parties du programme d'observer et de réagir aux changements de l'état du jeu. Le principe de ce design pattern est de définir une relation "un-à-plusieurs" entre objets de manière à ce que lorsque l'état d'un objet change, tous les objets dépendants en soient mis à jour automatiquement.

Dans ce contexte, la classe GameOverObserver joue le rôle d'observateur. Son but est de vérifier si le jeu est terminé en fonction de certains critères. Plus précisément, la méthode checkGameOver prend en paramètres l'état actuel du jeu (gameOver) et un objet zombie. Si la position en X du zombie est inférieure à 0, cela signifie que le zombie a dépassé la limite gauche de l'écran, et le jeu est considéré comme terminé. La méthode retourne alors true. Sinon, elle retourne simplement l'état actuel du jeu.

Le design pattern Observer est ensuite utilisé dans la classe GameController. Une instance de GameOverObserver est créée (this.GameOverObserver = new GameOverObserver();) et utilisée pour vérifier le statut du jeu à chaque itération dans la méthode handleZombies. La ligne de code suivante est responsable de l'observation du jeu:

```js
this.gameOver = this.GameOverObserver.checkGameOver(this.gameOver, this.zombies[i]);
```

Cette ligne met à jour la variable gameOver en fonction du résultat de la vérification effectuée par l'observateur GameOverObserver. Ainsi, dès qu'un zombie atteint la limite gauche de l'écran, le statut du jeu est mis à jour, et d'autres parties du programme peuvent réagir en conséquence.

Le design pattern Observer est donc utilisé ici pour déclencher des actions en réponse à des changements spécifiques dans l'état du jeu, en l'occurrence, la fin du jeu lorsque le zombie atteint la limite gauche de l'écran.
