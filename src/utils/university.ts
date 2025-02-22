import { User } from 'firebase/auth';
const universities = [
  {
    dominios: ['usp.br'],
    code: 'usp',
    name: 'Universidade de São Paulo',
  },
  {
    dominios: ['unicamp.br'],
    code: 'unicamp',
    name: 'Universidade Estadual de Campinas',
  },
  {
    dominios: ['ufrj.br'],
    code: 'ufrj',
    name: 'Universidade Federal do Rio de Janeiro',
  },
  {
    dominios: ['unesp.br'],
    code: 'unesp',
    name: 'Universidade Estadual Paulista Júlio de Mesquita Filho',
  },
  {
    dominios: ['ufmg.br'],
    code: 'ufmg',
    name: 'Universidade Federal de Minas Gerais',
  },
  {
    dominios: ['ufrgs.br'],
    code: 'ufrgs',
    name: 'Universidade Federal do Rio Grande do Sul',
  },
  {
    dominios: ['unb.br'],
    code: 'unb',
    name: 'Universidade de Brasília',
  },
  {
    dominios: ['ufsc.br'],
    code: 'ufsc',
    name: 'Universidade Federal de Santa Catarina',
  },
  {
    dominios: ['ufpr.br'],
    code: 'ufpr',
    name: 'Universidade Federal do Paraná',
  },
  {
    dominios: ['ufpe.br'],
    code: 'ufpe',
    name: 'Universidade Federal de Pernambuco',
  },
  {
    dominios: ['ufc.br'],
    code: 'ufc',
    name: 'Universidade Federal do Ceará',
  },
  {
    dominios: ['ufscar.br'],
    code: 'ufscar',
    name: 'Universidade Federal de São Carlos',
  },
  {
    dominios: ['ufba.br'],
    code: 'ufba',
    name: 'Universidade Federal da Bahia',
  },
  {
    dominios: ['uel.br'],
    code: 'uel',
    name: 'Universidade Estadual de Londrina',
  },
  {
    dominios: ['ufg.br'],
    code: 'ufg',
    name: 'Universidade Federal de Goiás',
  },
  {
    dominios: ['ufes.br'],
    code: 'ufes',
    name: 'Universidade Federal do Espírito Santo',
  },
  {
    dominios: ['ufrn.br'],
    code: 'ufrn',
    name: 'Universidade Federal do Rio Grande do Norte',
  },
  {
    dominios: ['ufmt.br'],
    code: 'ufmt',
    name: 'Universidade Federal de Mato Grosso',
  },
  {
    dominios: ['ufpa.br'],
    code: 'ufpa',
    name: 'Universidade Federal do Pará',
  },
  {
    dominios: ['ufal.br'],
    code: 'ufal',
    name: 'Universidade Federal de Alagoas',
  },
  {
    dominios: ['ufpb.br'],
    code: 'ufpb',
    name: 'Universidade Federal da Paraíba',
  },
  {
    dominios: ['ufma.br'],
    code: 'ufma',
    name: 'Universidade Federal do Maranhão',
  },
  {
    dominios: ['ufjf.br'],
    code: 'ufjf',
    name: 'Universidade Federal de Juiz de Fora',
  },
  {
    dominios: ['ufu.br'],
    code: 'ufu',
    name: 'Universidade Federal de Uberlândia',
  },
  {
    dominios: ['uece.br'],
    code: 'uece',
    name: 'Universidade Estadual do Ceará',
  },
  {
    dominios: ['ufpel.edu.br'],
    code: 'ufpel',
    name: 'Universidade Federal de Pelotas',
  },
  {
    dominios: ['ufam.edu.br'],
    code: 'ufam',
    name: 'Universidade Federal do Amazonas',
  },
  {
    dominios: ['ufpi.br'],
    code: 'ufpi',
    name: 'Universidade Federal do Piauí',
  },
  {
    dominios: ['ufrrj.br'],
    code: 'ufrrj',
    name: 'Universidade Federal Rural do Rio de Janeiro',
  },
  {
    dominios: ['ufms.br'],
    code: 'ufms',
    name: 'Universidade Federal de Mato Grosso do Sul',
  },
];

export function getUniversityCode(user: User) {
  const email = user.email;
  if (!email) {
    return '';
  }
  const domain = email.split('@')[1];
  const university = universities.find((university) =>
    university.dominios.some((universityDomain) =>
      domain.endsWith(universityDomain)
    )
  );
  return university?.code || '';
}

export function getUniversityName(user: User) {
  const email = user.email;
  if (!email) {
    return '';
  }
  const domain = email.split('@')[1];
  const university = universities.find((university) =>
    university.dominios.some((universityDomain) =>
      domain.endsWith(universityDomain)
    )
  );

  return university?.name || '';
}


export function getUniversityNameByCode(code: string) {
  const university = universities.find((university) => university.code === code);
  return university?.name || '';
}
