import Constants from '../helpers/Constants';

// function to ensure randomness of food position
const randomPosition = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// entities are objects passed to GameEngine(head, tail, food)
export default function (entities: any, {events, dispatch}: any) {
  //accessing the objects from entites
  const head = entities.head;
  const food = entities.food;
  const tail = entities.tail;

  // handling movement of snake when clicking the buttons
  if (events.length) {
    events.forEach((e: any) => {
      switch (e) {
        case 'move-up':
          if (head.yspeed === 1) {
            return;
          }
          head.yspeed = -1;
          head.xspeed = 0;
          return;
        case 'move-right':
          if (head.xspeed === -1) {
            return;
          }
          head.xspeed = 1;
          head.yspeed = 0;
          return;
        case 'move-down':
          if (head.yspeed === -1) {
            return;
          }
          head.yspeed = 1;
          head.xspeed = 0;
          return;
        case 'move-left':
          if (head.xspeed === 1) {
            return;
          }
          head.xspeed = -1;
          head.yspeed = 0;
          return;
      }
    });
  }
  // updating nextMove by 0 by subtracting 1 on every frame
  head.nextMove -= 1;
  if (head.nextMove === 0) {
    // nextMove is updated to its initialValue
    head.nextMove = head.updateFrequency;
    // game over condition when snake touches the wall
    // game over when condition is true else updating the snake's head position
    if (
      head.position[0] + head.xspeed < 0 ||
      head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
      head.position[1] + head.yspeed < 0 ||
      head.position[1] + head.yspeed >= Constants.GRID_SIZE
    ) {
      // to listen this event, we need to pass onEvent prop to GameEngine
      dispatch('game-over');
    } else {
      //updating tail element to follow the head
      tail.elements = [[head.position[0], head.position[1]], ...tail.elements];
      //removing last item from array
      tail.elements.pop();
      //moving the snake's head on every frame
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;
      //game over condition when snake eats its own tail
      tail.elements.forEach((el: any) => {
        if (head.position[0] === el[0] && head.position[1] === el[1]) {
          dispatch('game-over');
        }
      });
      // checking the position of head and food
      if (
        head.position[0] === food.position[0] &&
        head.position[1] === food.position[1]
      ) {
        //adding the tail component at food position
        tail.elements = [
          [head.position[0], head.position[1]],
          ...tail.elements,
        ];
        // setting the position of food when head and food position are same
        food.position = [
          randomPosition(0, Constants.GRID_SIZE - 1),
          randomPosition(0, Constants.GRID_SIZE - 1),
        ];
      }
    }
  }

  return entities;
}
