const Validate = {
    apply(input, func) {
      Validate.clearErrors(input);
  
      let results = Validate[func](input.value);
      input.value = results.value;
  
      if (results.error) Validate.displayError(input, results.error);
    },
    displayError(input, error) {
      const div = document.createElement("div");
      div.classList.add("error");
      div.innerHTML = error;
      input.parentNode.appendChild(div);
      input.parentNode.style.color = "red";
  
      const inputDiv = document.querySelector("input[type=email]");
      inputDiv.style.outline = "1px solid red";
  
      input.focus();
    },
    clearErrors(input) {
      const errorDiv = input.parentNode.querySelector(".error");
      const inputDiv = document.querySelector("input[type=email]");
      if (errorDiv) errorDiv.remove();
      inputDiv.style.outline = "none";
    },
    isEmail(value) {
      let error = null;
  
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
      if (!value.match(mailFormat)) error = "E-mail inválido.";
  
      return {
        error,
        value,
      };
    },
  };