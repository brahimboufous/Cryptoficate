pragma solidity ^0.5.0;


contract Certificate {
  address public owner;
  mapping (bytes32 => address) public records;

  //struct certificates
    struct certificateObject 
    {
        //uint id;
        uint timeOfIssue;
        address issuer;
        string recipient;
        string cin;
        string organisation;
        string diplome; 
        string specialite;
        string grade;
    }

  mapping (bytes32 => certificateObject) public certificates; 
  event CertificateIssued(bytes32 indexed record, uint256 timestamp, bool returnValue);

constructor() public {
    owner = msg.sender;
  } 

// deliver a certtificate and put it in blockchain
  function issueCertificate(string calldata recipient,string calldata cin,string calldata organisation,string calldata diplome,string calldata specialite,string calldata grade) external {
    bytes32 certificate = keccak256(abi.encodePacked(recipient,cin,organisation,diplome,specialite,grade));    
    require(certificate != keccak256(abi.encodePacked("")));
    records[certificate] = msg.sender;

    certificates[certificate] =certificateObject(now,msg.sender,recipient,cin,organisation,diplome,specialite,grade);
    emit CertificateIssued(certificate, block.timestamp, true);
  }

  function owningAuthority() external view returns (address) {   
    return owner;
  }


function verifyCertificateHash(bytes32 certificate) external view returns (bool) {
      if (certificates[certificate].issuer == address(0)) {
        return false;
      }
        return true;
}

function viewCertificate(bytes32 certificate) view public returns(string memory recipient,string memory cin,string memory organisation,string memory diplome, string memory specialite,string memory grade){
        return (certificates[certificate].recipient,certificates[certificate].cin,certificates[certificate].organisation,certificates[certificate].diplome,certificates[certificate].grade,certificates[certificate].specialite);
    }  
}