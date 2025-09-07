// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const form = document.querySelector( "form" )
  let formData = new FormData(form)
  let body = JSON.stringify(Object.fromEntries(formData.entries()))

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()
  form.reset()

  console.log( "text:", text )
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  const form = document.querySelector("form");
  const clearButton = document.getElementById("clearButton");
  clearButton.onclick = function() {
    form.reset();
  }
}

