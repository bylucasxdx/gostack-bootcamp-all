# Recuperação de senha

**RF** 

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** 

- Utilizar Mailtrap para envio de e-mails em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano;

**RN** 

- O link enviado por e-mail para resetar senha deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email que já existente
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usúario deve poder realizar um novo agendamento com um novo prestador; 

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8hr às 18hrs (Primeiro as 8, último as 17:00)
- O usuário nao pode agendar um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;



#### Legenda
RF: Requisitos funcionais
RNF: Requisitos não funcionais 
RN: Regras de negócio