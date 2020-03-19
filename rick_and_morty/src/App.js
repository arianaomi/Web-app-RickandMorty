import React from "react";
import "./App.css";
import "./lib/api";
import api from "./lib/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActivo: false,
      personajes: [],
      Personajeseleccionado: {}
    };
  }

  componentDidMount() {
    api
      .getAllCharacters()
      .then(results => {
        this.setState({
          personajes: results
        });
      })
      .catch(e => console.error(e));
  }

  activarModal(id) {
    api.getCharactersById(id).then(personaje => {
      this.setState({
        modalActivo: true,
        Personajeseleccionado: personaje
      });
    });
  }

  desactivarModal() {
    this.setState({
      modalActivo: false
    });
  }

  renderCards(p) {
    return (
      <div
        key={p.id}
        className="Card"
        onClick={personaje => this.activarModal(p.id)}
      >
        <div className="Card-imagen">
          <figure>
            <img alt="test" src={p.image} />
          </figure>
        </div>
        <div className="Card-descripcion">
          <div className="Card-name">
            <h3>{p.name}</h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { modalActivo, personajes } = this.state;

    const cards = personajes.map(e => this.renderCards(e));
    console.log(cards);
    return (
      <div className="App">
        <div className="App-contenedor">
          <h1>Rick and Morty</h1>
          <div className="Cards-contenedor">{cards}</div>
          {modalActivo ? (
            <div className="Modal" onClick={e => this.desactivarModal()}>
              <div className="Card-detalle">
                <div className="Card-imagen">
                  <figure>
                    <img
                      alt="test"
                      src={this.state.Personajeseleccionado.image}
                    />
                  </figure>
                </div>
                <div className="Card-detalle-descripcion">
                  <div className="descripcion">
                    <h3>{this.state.Personajeseleccionado.name}</h3>
                    <div className="caracteristica">
                      <p>Status</p>
                      <p className="caracteristica-valor">
                        {this.state.Personajeseleccionado.status}
                      </p>
                    </div>
                    <div className="caracteristica">
                      <p>Especie</p>
                      <p className="caracteristica-valor">
                        {this.state.Personajeseleccionado.species}
                      </p>
                    </div>
                    <div className="caracteristica">
                      <p>Genero</p>
                      <p className="caracteristica-valor">
                        {this.state.Personajeseleccionado.gender}
                      </p>
                    </div>
                    <div className="caracteristica">
                      <p>Origen</p>
                      <p className="caracteristica-valor">
                        {this.state.Personajeseleccionado.origin.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
