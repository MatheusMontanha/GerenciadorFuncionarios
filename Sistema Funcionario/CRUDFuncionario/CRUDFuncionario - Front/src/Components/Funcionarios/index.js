/**
 *
 */
import React, { Component } from "react";
import { Table, Button, FormGroup, Label, Input, Alert } from "reactstrap";
import PubSub from "pubsub-js";

class FormFuncionario extends Component {
  state = {
    model: {
      nome: "",
      sobrenome: "",
      email: "",
      numeroPIS: ""
    }
  };

  setValue = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
    console.log(this.state.model);
  };

  criar = () => {
    this.setState({
      model: { nome: "", sobrenome: "", email: "", numeroPIS: "" }
    });
    this.props.cadastrarFuncionario(this.state.model);
  };

  componentDidMount() {
    PubSub.subscribe("edit-funcionario", (topic, funcionario) => {
      this.setState({ model: funcionario });
    });
  }

  render() {
    return (
      <form>
        <FormGroup>
          <div className="form-row">
            <div className="col-md-6">
              <Label for="nome">Nome:</Label>
              <Input
                id="nome"
                type="text"
                value={this.state.model.nome}
                placeholder="Primeiro nome"
                onChange={e => this.setValue(e, "nome")}
              />
            </div>
            <div className="col-md-6">
              <Label for="sobrenome">Sobrenome:</Label>
              <Input
                id="sobrenome"
                type="text"
                value={this.state.model.sobrenome}
                placeholder="Sobrenome completo"
                onChange={e => this.setValue(e, "sobrenome")}
              />
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <div className="col-md-6">
              <Label for="email">Email:</Label>
              <Input
                id="email"
                type="text"
                value={this.state.model.email}
                placeholder="Email"
                onChange={e => this.setValue(e, "email")}
              />
            </div>
            <div className="col-md-6">
              <Label for="numeroPIS">Número PIS:</Label>
              <Input
                id="numeroPIS"
                type="text"
                value={this.state.model.numeroPIS}
                placeholder="Número PIS"
                onChange={e => this.setValue(e, "numeroPIS")}
              />
            </div>
          </div>
        </FormGroup>
        <Button color="primary" block onClick={this.criar}>
          Salvar
        </Button>
      </form>
    );
  }
}

/*
Classe contendo a lista de funcionarios 
*/
class ListFuncionarios extends Component {
  deletar = idFuncionario => {
    this.props.deletar(idFuncionario);
  };

  editar = funcionario => {
    PubSub.publish("edit-funcionario", funcionario);
  };
  render() {
    const { funcionarios } = this.props;
    return (
      <Table className="table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Número PIS</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.idFuncionario}>
              <td>
                {funcionario.nome} {funcionario.sobrenome}
              </td>
              <td>{funcionario.email}</td>
              <td>{funcionario.numeroPIS}</td>
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={e => this.editar(funcionario)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={e => this.deletar(funcionario.idFuncionario)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

/*
Classe que lista os funcionários, assim como os métodos de 
cadastrar, deletar e atualizar.
*/
export default class FuncionariosBox extends Component {
  Url = "http://localhost:8080/Funcionarios";
  state = {
    funcionarios: [],
    message: {
      text: "",
      alert: ""
    }
  };

  componentDidMount() {
    fetch(this.Url)
      .then(response => response.json())
      .then(funcionarios => this.setState({ funcionarios }))
      .catch(e => console.log(e));
  }

  save = funcionario => {
    let data = {
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      email: funcionario.email,
      numeroPIS: funcionario.numeroPIS
    };

    console.log(data);
    const requestInfo = {
      method: data.id !== 0 ? "PUT" : "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    if (data.id === 0) {
      //Cria novo funcionário
      fetch(this.Url, requestInfo)
        .then(response => response.json())
        .then(novoFuncionario => {
          let { funcionarios } = this.state;
          funcionarios.push(novoFuncionario);
          this.setState({
            funcionarios,
            message: {
              text: "Novo funcionário cadastrado com sucesso!",
              alert: "info"
            }
          });
        })
        .catch(e => console.log(e));
    } else {
      //Edita um funcionário cadastrado
      fetch(`${this.Url}/${data.id}`, requestInfo)
        .then(response => response.json())
        .then(funcionarioAtualizado => {
          let { funcionarios } = this.state;
          let position = funcionarios.findIndex(
            funcionario => funcionario.idFuncionario === data.id
          );
          funcionarios[position] = funcionarioAtualizado;
          this.setState({
            funcionarios,
            message: {
              text: "Funcionário Atualizado com sucesso!",
              alert: "info"
            }
          });
        })
        .catch(e => console.log(e));
    }
  };

  deletar = id => {
    fetch(`${this.Url}/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(rows => {
        const funcionarios = this.state.funcionarios.filter(
          funcionario => funcionario.idFuncionario !== id
        );
        this.setState({
          funcionarios,
          message: {
            text: "Funcionário excluido com sucesso!",
            alert: "info"
          }
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        {this.state.message.text !== "" ? (
          <Alert color={this.state.message.alert}>
            {this.state.message.text}
          </Alert>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">
              Cadastro de Funcionários
            </h2>
            <FormFuncionario cadastrarFuncionario={this.save} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">
              Lista de Funcionários
            </h2>
            <ListFuncionarios
              funcionarios={this.state.funcionarios}
              deletar={this.deletar}
            />
          </div>
        </div>
      </div>
    );
  }
}
