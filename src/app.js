
var diplomeData={}

App = {
  loading: false,
  contracts: {},
  certificate :{},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]

    web3.eth.defaultAccount = web3.eth.accounts[0];
    console.log(App.account);
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const certificate = await $.getJSON('Certificate.json')
    App.contracts.Certificate = TruffleContract(certificate)
    App.contracts.Certificate.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.certificate = await App.contracts.Certificate.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }
    App.setLoading(true)
    $('#account').html(App.account)
    App.setLoading(false)
  },

  addCertificate: async () => {
    const recipient = $('#name').val()
    const org = $('#organisme').val()
    const grade = $('#mention').val()
    const cin = $('#cin').val()
    const diplome = $('#diplome').val()
    const specialite = $('#specialite').val()
    RValues=await App.certificate.issueCertificate(recipient,cin,org,diplome,specialite,grade,{from: web3.eth.accounts[0], gas: 3000000 })
    return RValues;
  },


  viewCertificate: async (hash) => {
   
      view = await App.certificate.viewCertificate(hash)
      return view;
    
  },


  verifyCertificate: async (hash) => {
    verify = await App.certificate.verifyCertificateHash(hash)
    return verify
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },

  setLoading2: (boolean) => {
    App.loading = boolean
    const loader = $('#loader2')
    const content = $('#content2')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})


function test() {
        
    const hash = $('#HashBlock').val()
    App.verifyCertificate(hash).then(function(etat) {
    
    console.log(etat)
    if (etat) {
        Swal.fire({
          text: 'ce diplome existe sur la blockchain',
          icon: 'success',
          confirmButtonText: 'voir'
        }).then((result) => {
          if (result.isConfirmed) {
            viewDiplome(hash);
          }
        });
    }else{
      Swal.fire({
        text: "ce diplome n'existe pas",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });    
   
  return false;
}

function viewDiplome(hash) {
  App.viewCertificate(hash).then(function(view) {
    diplomeData=view;
    console.log(diplomeData)
    Swal.fire({
      width: 1400,
      //template: '#my-template',
      confirmButtonText: 'cancel',
      html:'<div class="jw-modal " ><div class="jw-modal-body " > <jw-modal class="position-relative" > <div > <div class="card mb-3" style="width: 100%;background-color: rgb(255, 255, 255) ;">  <div class="row g-0" > <div class="col-md-8"> <div class="cert-container" id="content" #content > <div class="border-gray"> <div class="border-red"> <div class="content" > <div style="margin: 10px; " > <div>Diplochain</div> </div> <div style="display: flex; justify-content :space-between;margin: 30px 40px 30px 40px; margin-bottom: 20px; "> <div id="inOrg">'+ view[2] +'</div> <div >  </div> </div> <div class="copytext-container" style="margin-top: 20px;" > <div class="congrats-copytext" style="margin-bottom: 20px"> <h3 style="margin-bottom: 30px;" id="inDip">'+ view[3] +'</h3><br> <h4>Congratulations <p #inName style=" font-weight: 500;font-size: 19px;">'+ view[0] +'</p></h4><br> <h5 id="user-id-string">CIN : <span id="inCIN">'+ view[1] +'</span></h5> </div> <div class="course-copytext" style="margin-bottom: 20px" > <h3><span id="inSpec" style=" font-size: 17px;">'+ view[5] +'</span></h3><br> <h5>mention : <span id="inGrade"> '+ view[4] +'</span></h5> </div> </div> <div style="display: flex; justify-content :space-between; margin: 10px;"> <ul class="credentials" > <li> <p id="cert-id">Hash code: <span>'+hash+'</span></p> </li> </ul> <div style="text-align: left"> <a href="https://www.freepnglogos.com/pics/signature" title="Image from freepnglogos.com"><img src="https://www.freepnglogos.com/uploads/signature-png/signatures-download-clipart-29.png" width="100" alt="signatures download clipart" /></a> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-4" > <div class="card-body" style="height: 85%;" > <h5 class="card-title">Vue du diplome</h5> <p class="card-text">Ce diplome est immutable.</p><img  src="assets/img/verified.png" alt="" height="120"> <p class="card-text"><small class="text-muted">vous pouvez l`exporter sous format PDF</small></p> </div> <div class="card-footer" style="display:flex; justify-content:space-around "> <button class="btn btn-success" style="bottom: 0px;" onclick="exportAsPdf();">Exporter (.pdf)</button> </div> </div> </div> </div> </div> </jw-modal></div></div><div class="jw-modal-background"></div>'
    });
     
});
 
return false;
}


function mint() {
  const email ="brahimboufous3.14@gmail.com";
  const name="Monsieur";
  App.addCertificate().then(function(etat) {

    console.log(etat.logs[0].args.record)
    code=etat.logs[0].args.record;
    console.log(sendEmail2(code,email,name))
  });

  return false;

}





function sendEmail2(code,email,name) {

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:9005/sendMail?code=${code}&email=${email}&name=${name}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "code": code,
    "email": email,
    "name": name

  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (Object.keys( objects ).length != 0) {
       
        Swal.fire({
          text: "Le diplome a été deposé. "+"\n Le Hash code est envoyé au détenteur du diplome ",
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } 
    }
  };
  return false;
}

