import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
const { ethers } = require('hardhat');
import { HardhatUpgrades } from '@openzeppelin/hardhat-upgrades'

import { deployVoting, waitSeconds } from '../helper';

const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const prod_mode = false;

	const _hec = prod_mode ? '0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0' : '0x55639b1833Ddc160c18cA60f5d0eC9286201f525';
	const _sHec = prod_mode ? '0x75bdeF24285013387A47775828bEC90b91Ca9a5F' : '0x71264c23604fa78D1eFcc32af1c73714F33dCdb4';
	const _wsHec = prod_mode ? '0x94CcF60f700146BeA8eF7832820800E2dFa92EdA' : '0x6225eeA79a0baF0c7e368Db4de1e8066589815B1';
	const _usdc = prod_mode ? '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75' : '0x6f3da9C6700cAfBAb0323cF344F58C54B3ddB66b';
	const _spookySwapFactory = prod_mode ? '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3' : '0xEE4bC42157cf65291Ba2FE839AE127e3Cc76f741';
	const _spookySwapRotuer = prod_mode ? '0xbe4fc72f8293f9d3512d58b969c98c3f676cb957' : '0xa6AD18C2aC47803E193F75c3677b14BF19B94883';

	const _lockAddressRegistry = prod_mode
		? ['0x55639b1833Ddc160c18cA60f5d0eC9286201f525', '0x55639b1833Ddc160c18cA60f5d0eC9286201f525']
		: ['0x2D86a40Ff217493cCE3a23627F6A749dAe1f9018', '0x2D86a40Ff217493cCE3a23627F6A749dAe1f9018'];

	const _tokenVault = prod_mode
		? ['0x1fA6693d9933CC7f578CDd35071FC6d6cc8451E0', '0x1fA6693d9933CC7f578CDd35071FC6d6cc8451E0']
		: ['0x4b7dC9E2Cc8B97Fe6073d03667Aed96c071c532B', '0x4b7dC9E2Cc8B97Fe6073d03667Aed96c071c532B'];

	// Deploy Voting
	const gas = await ethers.provider.getGasPrice();
	console.log('Gas Price: ', gas.toNumber());

	const VotingContract = await ethers.getContractFactory('Voting');
	console.log('Deploying Voting V1 Contract...');

	const votingContract = await HardhatUpgrades.deployProxy(VotingContract, [_hec, _sHec, _wsHec, _usdc, _spookySwapFactory, _spookySwapRotuer], {
		initializer: 'initialize',
	});

	await votingContract.deployed();
	console.log('Voting:', votingContract.address);

	// const voting = await deployVoting(_hec, _sHec, _wsHec, _usdc, _spookySwapFactory, _spookySwapRotuer);
	// console.log('Voting: ', voting.address);
	// await waitSeconds(10);

	// const lockFarm = prod_mode
	// 	? ['0x80993B75e38227f1A3AF6f456Cf64747F0E21612', '0xd7faE64DD872616587Cc8914d4848947403078B8']
	// 	: ['0xC464e6d45004Bf56772E70e22d9cF61C5Ae63970', '0x0112F57a5EF77b7D074D7213127Df8E907D017bE'];

	// const stakingToken = prod_mode
	// 	? ['0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0', '0x0b9589A2C1379138D4cC5043cE551F466193c8dE']
	// 	: ['0x55639b1833Ddc160c18cA60f5d0eC9286201f525', '0x9C4Ee29CD1C219623eBEA40A42b5af11414D7C90'];

	// // Add LockFarms
	// for (let i = 0; i < lockFarm.length; i++) {
	// 	await voting.addLockFarmForOwner(lockFarm[i], stakingToken[i], _lockAddressRegistry[i], _tokenVault[i]);
	// 	console.log('LockFarm #', i + 1, ':', lockFarm[i]);
	// 	await waitSeconds(3);
	// }

	// try {
	// 	await hre.run('verify:verify', {
	// 		address: voting.address,
	// 		contract: 'contracts/Voting.sol:Voting',
	// 		constructorArguments: [_hec, _sHec, _wsHec, _usdc, _spookySwapFactory, _spookySwapRotuer],
	// 	});
	// } catch (_) {}
};

deploy.tags = ['Voting'];
export default deploy;
