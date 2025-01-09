class Despesa{

	constructor(ano, mes, dia, tipo, descricao, valor){

		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor

	}

	validarDados(){

		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}

		return true



	}


}

class Bd{

	constructor(){

		this.id = localStorage.getItem('id')

		if(this.id == null){

			localStorage.setItem('id', 0)


		}


	}



	getProximoId(){

		let getProximoId = localStorage.getItem('id')

		return parseInt(getProximoId) + 1

	}


	gravar(despesa){

		let id  = this.getProximoId()

		
		localStorage.setItem('id', id)
		localStorage.setItem(id, JSON.stringify(despesa))
	}

	recuperarTodosRegistros(){

		let id = localStorage.getItem('id')
		let despesas = []

		//Recuperar todoas as despesas armazendas no localStorage
		for(let i = 1; i <= id; i++){

			let despesa = JSON.parse(localStorage.getItem(i))


			if(despesa != null){
				despesas.push(despesa)
			}

		}

		return despesas

	}

	pesquisar(despesa){
		let despesasFiltradas = []
		despesasFiltradas = this.recuperarTodosRegistros()
		//console.log(despesasFiltradas)
		//console.log(despesa)


		//Ano
		if(despesa.ano != ''){
		despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		//mês
		if(despesa.mes != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if(despesa.tipo != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descrição
		if(despesa.descricao != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas
	}


}

let bd = new Bd()



function cadastrarDespesa(){

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)


	if(despesa.validarDados()){
		bd.gravar(despesa)
		sucessoGravacao()
		$('#registraDespesa').modal('show')
	}else{
		erroGravacao()
		$('#registraDespesa').modal('show')
	}


	

}

function carregarListaDespesas(){

	let despesas = []

	despesas = bd.recuperarTodosRegistros()

	//selecionando o elemento tbody
	let listaDespesas = document.getElementById('lista-despesas')

	//percorrer o array despesas, listando cada despesa de fornma dinamica
	despesas.forEach(function(d){

		//criando a linha

		let linha = listaDespesas.insertRow()

		//Criando as colunas
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		switch(parseInt(d.tipo)){
			case 1:
				linha.insertCell(1).innerHTML = "Alimentação"
				break
			case 2:
				linha.insertCell(1).innerHTML = "Educação"
				break
			case 3: 
				linha.insertCell(1).innerHTML = "Lazer"
				break
			case 4:
				linha.insertCell(1).innerHTML = "Saúde"
				break
			case 5:
				linha.insertCell(1).innerHTML = "Transporte"
		}
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})



}

function pesquisarDespesa(){

	let dia = document.getElementById("dia").value
	let mes = document.getElementById("mes").value
	let ano = document.getElementById("ano").value
	let tipo = document.getElementById("tipo").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	let listaDespesas = document.getElementById('lista-despesas')
	listaDespesas.innerHTML = ''

	despesas.forEach(function(d){

		//criando a linha

		let linha = listaDespesas.insertRow()

		//Criando as colunas
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		switch(parseInt(d.tipo)){
			case 1:
				linha.insertCell(1).innerHTML = "Alimentação"
				break
			case 2:
				linha.insertCell(1).innerHTML = "Educação"
				break
			case 3: 
				linha.insertCell(1).innerHTML = "Lazer"
				break
			case 4:
				linha.insertCell(1).innerHTML = "Saúde"
				break
			case 5:
				linha.insertCell(1).innerHTML = "Transporte"
		}
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})


}




function sucessoGravacao(){
	
	document.getElementById('cabecalho').classList.remove('text-danger')
	document.getElementById('cabecalho').classList.add('text-success')
	document.getElementById('exampleModalLabel').innerHTML = 'Registro inserido com sucesso'
	document.getElementById('textoBody').innerHTML = 'Despesa foi cadastrada com sucesso!'
	document.getElementById('botaoModal').classList.remove('btn-danger')
	document.getElementById('botaoModal').classList.add('btn-success')
	document.getElementById('botaoModal').innerHTML = 'Voltar'

	ano.value = ""
	mes.value = ""
	dia.value = ""
	tipo.value = ""
	descricao.value = ""
	valor.value = ""


}

function erroGravacao(){
	document.getElementById('cabecalho').classList.add('text-danger')
	document.getElementById('exampleModalLabel').innerHTML = 'Erro na gravação'
	document.getElementById('textoBody').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
	document.getElementById('botaoModal').classList.add('btn-danger')
	document.getElementById('botaoModal').innerHTML = 'Voltar e corrigir'
}



