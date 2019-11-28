var express = require("express");
var bodyParser = require("body-parser");
var mongo_client = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/alunos", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const alunos = db.collection("alunos");

			if(!db || !alunos){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				alunos.find({}).toArray(function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	res.statusCode = 200;
				    	res.end(JSON.stringify(docs));
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.get("/api/alunos/:matricula", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const alunos = db.collection("alunos");

			if(!db || !alunos){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				alunos.find({matricula: req.params.matricula}).toArray(function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	if(docs.length == 0) {
				    		res.statusCode = 404;
				    		res.end("Não há alunos com essa matrícula");
				    	} else {
				    		res.statusCode = 200;
				    		res.end(JSON.stringify(docs));
				    	}
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.post("/api/alunos", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const alunos = db.collection("alunos");

			if(!db || !alunos){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				alunos.insertOne({matricula: req.body.matricula, nome: req.body.nome, curso: req.body.curso}, function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
			    		res.statusCode = 200;
			    		res.end(JSON.stringify(docs.ops[0]));
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.put("/api/alunos/:matricula", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const alunos = db.collection("alunos");

			if(!db || !alunos){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				const update = {matricula: parseInt(req.params.matricula), nome: req.body.nome, curso: req.body.curso};
				alunos.updateOne({matricula: parseInt(req.params.matricula)}, { $set: update}, function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	if(docs.modifiedCount == 0){
				    		res.statusCode = 404;
				    		res.end("Nenhum aluno foi modificado");
				    	} else {
				    		res.statusCode = 200;
			    			res.end(JSON.stringify(update));
				    	}
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.delete("/api/alunos/:matricula", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const alunos = db.collection("alunos");

			if(!db || !alunos){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				const update = {matricula: parseInt(req.params.matricula), nome: req.body.nome, curso: req.body.curso};
				alunos.deleteOne({matricula: parseInt(req.params.matricula)}, function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	if(docs.deletedCount == 0){
				    		res.statusCode = 404;
				    		res.end("Nenhum aluno foi deletado");
				    	} else {
				    		res.statusCode = 200;
			    			res.end(JSON.stringify(update));
				    	}
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.get("/api/campi", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const campi = db.collection("campi");

			if(!db || !campi){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				campi.find({}).toArray(function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	res.statusCode = 200;
				    	res.end(JSON.stringify(docs));
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.get("/api/campi/:codigo", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const campi = db.collection("campi");

			if(!db || !campi){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				campi.find({codigo: req.params.codigo}).toArray(function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	if(docs.length == 0) {
				    		res.statusCode = 404;
				    		res.end("Não há campi com esse codigo");
				    	} else {
				    		res.statusCode = 200;
				    		res.end(JSON.stringify(docs));
				    	}
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.delete("/api/campi/:codigo", function(req, res){
	mongo_client.connect(url, function(err, client) {
		if(err){
			res.statusCode = 404;
			res.end("Could not connect to server");
		} else {
			const db = client.db("test");
			const campi = db.collection("campi");

			if(!db || !campi){
				res.statusCode = 404;
				res.end("Could not connect to database or to documents");
			} else {
				campi.deleteOne({codigo: parseInt(req.params.codigo)}, function(err, docs) {		  	
				    if(err){
				    	res.statusCode = 404;
						res.end("Could not find documents");	
				    } else {
				    	if(docs.deletedCount == 0){
				    		res.statusCode = 404;
				    		res.end("Nenhum campus foi deletado");
				    	} else {
				    		res.statusCode = 200;
			    			res.end(JSON.stringify(docs));
				    	}
				    }

				    client.close();
			  	});
			}
		}
	});
});

app.listen(3000, function(){
	console.log("app rodando na porta 3000");
});