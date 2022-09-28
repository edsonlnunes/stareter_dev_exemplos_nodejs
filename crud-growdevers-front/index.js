const listGrowdevers = document.getElementById('list-growdevers')
const alertModalInfo = document.getElementById('alert-modal-info')
const alertInfo = document.getElementById('alert-info')
const form = document.getElementById('form-detail-growdever')
const modal = new bootstrap.Modal(document.getElementById('modal-detail-growdever'))

function showModalAlert(message){
    alertModalInfo.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}

function showAlert(message){
    alertInfo.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}

function clearForm(){
    form.reset()
}

function addGrowdever(button){
    button.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>
    `
    
    setTimeout(async () => {
        const response = await fetch('http://localhost:8080/growdevers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: form.name.value,
                birth: form.birth.value,
                skills: form.skills.value.split(','),
                cpf: form.document.value
            })
        })

        const data = await response.json()

        button.innerHTML = 'Cadastrar'

        if(response.status !== 200){
            showModalAlert(data.error)
            return;
        }
        
        modal.hide()
        clearForm()
        loadGrowdevers()
    }, 3000)
}

function removeGrowdever(id, button){
    button.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>
    `
   setTimeout(async () => {
        const response = await fetch(`http://localhost:8080/growdevers/${id}`, {
            method: 'DELETE',
        })

        button.innerHTML = 'Remover'

        if(response.status !== 200) {
            const data = await response.json()
            showAlert(data.error)
            return;
        }
        
        loadGrowdevers()
   }, 2000)
}

function convertStatus(status){
    switch (status) {
        case 'STUDYING':
            return 'Estudando'
        case 'CANCELLED':
            return 'Cancelado'
        case 'GRADUATED':
            return 'Formado'
    }
}

function fillPage(growdevers){
    listGrowdevers.innerHTML = ''
    for (const growdever of growdevers) {
        listGrowdevers.innerHTML += `
            <div class="col pt-3">
                <div class="card" style="width: 18rem;" >
                    <div class="gradient-custom text-center text-white pt-3 pb-1">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" style="width: 80px;" class="card-img-top">
                        <h5 class="card-title text-center pt-2">${growdever.name}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Data de nascimento: </strong>${new Date(growdever.birth).toLocaleDateString()}</p>
                        <p><strong>CPF: </strong>${growdever.cpf}</p>
                        <p><strong>Status: </strong>${convertStatus(growdever.status)}</p>
                        <p><strong>Habilidades:: </strong>${growdever.skills}</p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-danger me-3" onclick="removeGrowdever('${growdever.uid}', this)">Remover</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

function loadGrowdevers(){
    fetch('http://localhost:8080/growdevers', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).then((data) => {
        fillPage(data)
    })
}

document.addEventListener('DOMContentLoaded', loadGrowdevers)