function runSequentially(tasks, finalCallback) {
  // inspection
  // tasks.forEach(element => {
  //     console.log(element)
  // });
  // console.log(finalCallback)

  // forEach, with side effect
  // let next = finalCallback
  // tasks.reverse().forEach(task => {
  //   const current = next
  //   next = () => {
  //     return task(current)
  //   }
  // });
  // next()
  
  // Reduce, without side effect
  const final = tasks.reduceRight((carry, f) => () => f(carry), finalCallback)
  final()

  // Manually
  // const done0 = () => tasks[2](finalCallback)
  // const done1 = () => tasks[1](done0)
  // const done2 = () => tasks[0](done1)
  // done2()
}

const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});

// Task 1
// Task 2
// Task 3
// All tasks complete!