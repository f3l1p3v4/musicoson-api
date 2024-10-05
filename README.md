# App

MusicosOn.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar como aluno ou instrutor;
- [ ] Deve ser possível se autenticar como aluno ou instrutor;
- [ ] Deve ser possível editar o perfil de um aluno/instrutor;
- [ ] Deve ser possível o instrutor cadastrar tarefas para um aluno ou grupo;
- [ ] Deve ser possível o instrutor editar o status das tarefas de um aluno ou grupo;
- [ ] Deve ser possível o aluno visualizar suas tarefas;
- [ ] Deve ser possível o instrutor criar avisos para todos;
- [ ] Deve ser possível o aluno e instrutores visualizar os avisos;
- [ ] Deve ser possível o instrutor criar programa mínimo para todos;
- [ ] Deve ser possível os alunos e instrutores visualizar os programas mínimo; 
- [ ] Deve ser possível o instrutor editar os programas mínimo;
- [ ] Deve ser possível o instrutor deletar os programas mínimo;

## RNs (Regras de negócio)

- [ ] Usuário do tipo instrutor vai ter os seguintes campos
    - id               
    - name          
    - instrument           
    - email            
    - phone            
    - password_hash 

- [ ] Osuário do tipo aluno vai ter os seguintes campos
    - id               
    - name          
    - instrument - Opcinal 
    - group - (Grupo 01 ou Grupo 02)
    - practical_level - (c. jovem | c. oficial | oficialização) - opcional        
    - email            
    - phone            
    - password_hash 
    
- [ ] O usuário não deve poder se cadastrar com um e-mail e telefone duplicado;
- [ ] As tarefas teram de seguir esta estrutura;
    - id               
    - title          
    - description 
    - observation
    - delivery_date
    - status - (  PENDING | COMPLETED)
    - category - ( MSA | METODO | HINOS)        
    - instructorId - Relacionamento com tabela de usuários do tipo INSTRUCTOR (para saber quem criou a tarefa)           
    - studentId - Relacionamento com tabela de usuários do tipo STUDENT (Para saber para quem foi criado essa tarefa)
- [ ] As tarefas só podem ser cadastradas por um instrutor; 
- [ ] Deve ser possível o instrutor visualizar apenas as tarefas que ele criou para um aluno individual ou para mais de um aluno e se for para o grupo todos podem visualizar;
- [ ] Apenas os instrutores podem mudar o status de uma tarefa;
- [ ] Os Avisos teram de seguir esta estrutura:
    - id
    - title
    - description
    - observation
    - instructorId - Relacionamento com tabela de usuários do tipo INSTRUCTOR (para saber quem criou a tarefa)
- [ ] Os avisos só podem ser cadastradas por um instrutor; 
- [ ] Deve ser possível o instrutor e alunos visualizar todos os avisos;
- [ ] Os Programas Mínimos teram de seguir esta estrutura:
    Exemplo de estrutura:
    [
        {
            "id": "",
            "instrument": "violino",
            "meetings": [
                {"name": "N. LAOUREX Vol. 1 até pág. 35"},
                {"name": "CCB até pág. 46 (lição 113) + H. SITT Vol 1 até lição 6"},
                {"name": "MÉTODO FACILITADO - Ed. Britten - até pág. 40"},
                {"name": "Obs.: Hinos 431 a 480 soprano no natural"}
            ],
            "cults": [
                {"name": "N. LAOUREX Vol. 1 completo + Vol,3 até pág. 15"},
                {"name": "CCB até pág. 67 (lição 162) + H. SITT Vol 1 até lição 14"},
                {"name": "MÉTODO FACILITADO-Ed. Britten - até pág. 55"},
                {"name": "Obs.: Hinário completo soprano 8° acima"}
            ],
            "officialization": [
                {"name": "N. LAOUREX Vol. 1 completo + Vol.3 até pág.24 e da pág. 44 a 53"},
                {"name": "MÉTODO CCB completo + H. SITT Op.32 Vol. 1 completo"},
                {"name": "MÉTODO FACILITADO - Ed. Britten - Completo"},
                {"name": "Obs.: Hinário completo soprano 8a acima e contralto natural"}
            ]
        },
        {
            "id": "",
            "instrument": "viola",
            "meetings": [
                {"name": "BEGINNING STRINGS até lição VI"},
                {"name": "BERTA VOLMER vol. 1 até pág. 31"},
                {"name": "MÉTODO FACILITADO - Ed. Britten - até pág. 40."},
                {"name": "Obs.: Hinos 431 a 480 tenor no natural"}
            ],
            "cults": [
                {"name": "BERTA VOLMER vol. 1 até pág. 62"},
                {"name": "A TUNE A DAY C.P. Herfurth Vol. 3 até pág 16"},
                {"name": "MÉTODO FACILITADO-Ed. Britten - até pág. 55"},
                {"name": "Obs.: Hinário completo tenor no natural"}
            ],
            "officialization": [
                {"name": "BERTA VOLMER vol. 1 completo"},
                {"name": "A TUNE A DAY C.P. Herfurth Vol. 3 completo"},
                {"name": "MÉTODO FACILITADO - Ed. Britten - Completo"},
                {"name": "Obs.: 1a a 3a posições, hinário completo, tenor no natural"}
            ]
        }
    ]
- [ ] Os Programas Mínimos só podem ser cadastradas por um instrutor; 
- [ ] Os Programas Mínimos só podem ser editados por um instrutor; 
- [ ] Os Programas Mínimos só podem ser deletados por um instrutor; 
- [ ] Deve ser possível o instrutor e alunos visualizar todos os programas mínimos;


## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);