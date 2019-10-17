import React, { Component } from "react";
import HomeCard from "../ui/HomeCard";
import { hashHistory } from "react-router";

export default class Home extends Component {
  HomeCardCadastrarFuncionarios = {
    className: "card text-white bg-info",
    title: "Cadastrar",
    text: "Cadastre funcionarios",
    action: () => hashHistory.push("/Cadastrar")
  };
  HomeCardListarFuncionarios = {
    className: "card text-white bg-secondary",
    title: "Listar",
    text: "Liste todos os funcionários",
    action: () => hashHistory.push("/Listar")
  };
  render() {
    return (
      
        <div className="container text-center">
          <div className="row justify-content-center align-items-center ">
            <HomeCard
              className={this.HomeCardCadastrarFuncionarios.className}
              title={this.HomeCardCadastrarFuncionarios.title}
              text={this.HomeCardCadastrarFuncionarios.text}
              action={this.HomeCardCadastrarFuncionarios.action}
            />
            <HomeCard
              className={this.HomeCardListarFuncionarios.className}
              title={this.HomeCardListarFuncionarios.title}
              text={this.HomeCardListarFuncionarios.text}
              action={this.HomeCardListarFuncionarios.action}
            />
            
          </div>
        </div>
    );
  }
}
