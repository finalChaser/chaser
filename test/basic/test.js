(function(){
  function* helloWorldGenerator() {
    console.log('hello');
    yield 'hello';
    console.log('world');
    yield 'world';
  }

  var hw = helloWorldGenerator();

  hw.next();

  hw.next();

  hw.next();
})();
