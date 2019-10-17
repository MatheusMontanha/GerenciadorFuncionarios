/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.matheus.CRUDFuncionario.SistemaFuncionario.dto;

import javax.validation.constraints.Size;

import lombok.Data;

/**
 *
 * @author Matheus Montanha
 */
@Data
public class FuncionarioDTO {

    @Size(min = 2, max = 30, message = "O nome não pode ser menor que 2 e maior que 30 caracteres.")
    private String nome;
    @Size(min = 2, max = 50, message = "O sobrenome não pode ser menor que 2 e maior que 30 caracteres.")
    private String sobrenome;
    private String email;
    @Size(min = 11, max = 11, message = "Número PIS inválido")
    private long numeroPIS;
}
