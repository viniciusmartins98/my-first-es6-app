import axios from "axios";

class App {
    constructor() {
        this.repositories = [];

        this.form = document.querySelector("form");

        this.input = document.querySelector("input");

        this.repoList = document.getElementById("repoList");
        
        this.error = document.getElementById("errorMessage");

        this.registerHandlers();

    }

    registerHandlers() {
        this.form.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {
        event.preventDefault();
        //Apaga e esconde mensagem de erro
        this.error.textContent = "";
        this.error.style.display = "none";

        try {
            this.error.textContent = "Carregando...";
            this.error.style.display = "block";
            const response = await axios.get(`https://api.github.com/repos/${this.input.value}`);
            const {name, description, owner: {avatar_url}, html_url} = response.data;
            
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });
            this.error.textContent = "";
            this.error.style.display = "none";
            this.render();
            
            console.log(this.repositories);
        } catch (error) {
            this.error.textContent = "* Repositório não encontrado";
            this.error.style.display = "block";
        } finally {
            this.input.value = "";
        }
    }

    render() {
        this.repoList.innerHTML = "";

        this.repositories.forEach(repo => {

            let li = document.createElement("li");
        
            let img = document.createElement("img");
            img.setAttribute("src", repo.avatar_url);
            img.setAttribute("class", "imgRepo");
        
            let strong = document.createElement("strong");
            strong.textContent = repo.name;

            let p = document.createElement("p");
            p.textContent = repo.description;

            let a = document.createElement("a");
            let b = document.createElement("b");
            a.setAttribute("target", "_blank");
            a.setAttribute("href", repo.html_url);
            b.textContent = "Acessar";
            a.appendChild(b);
        
            li.appendChild(img);
            li.appendChild(strong);
            li.appendChild(p);
            li.appendChild(a);
            this.repoList.appendChild(li);
        });
    }
}

new App();