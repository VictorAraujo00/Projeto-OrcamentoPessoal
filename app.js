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
		$('#sucessoGravacao').modal('show')
	}else{
		$('#erroGravacao').modal('show')
	}

	

}

