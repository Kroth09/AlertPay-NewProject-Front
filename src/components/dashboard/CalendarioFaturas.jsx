import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css'; // Nosso CSS personalizado para ajustar o visual

const mockFaturas = [
  { id: 1, descricao: 'Energia', valor: 245.80, vencimento: '2025-06-02', status: 'Atrasada' },
  { id: 2, descricao: 'Internet', valor: 119.90, vencimento: '2025-06-15', status: 'A vencer' },
  { id: 3, descricao: 'Academia', valor: 89.00, vencimento: '2025-06-20', status: 'A vencer' },
  { id: 4, descricao: 'Netflix', valor: 39.90, vencimento: '2025-07-01', status: 'A vencer' },
  { id: 6, descricao: 'Aluguel', valor: 1500.00, vencimento: '2025-06-05', status: 'Paga' },
];

// Configuração para o calendário entender o formato de data e o idioma
const locales = {
  'pt-BR': ptBR,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Mensagens traduzidas para o português
const messages = {
  allDay: 'Dia todo',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste período.',
  showMore: total => `+ Ver mais (${total})`
};

// Transforma nossas faturas em 'eventos' para o calendário
const eventosFaturas = mockFaturas.map(fatura => {
  const dataVencimento = new Date(fatura.vencimento);
  // Adiciona 1 dia para corrigir problemas de fuso horário que podem fazer o evento aparecer um dia antes
  dataVencimento.setMinutes(dataVencimento.getMinutes() + dataVencimento.getTimezoneOffset());

  return {
    title: `${fatura.descricao} - R$${fatura.valor.toFixed(2)}`,
    start: dataVencimento,
    end: dataVencimento, // Para eventos de um dia, start e end são iguais
    allDay: true,
    resource: fatura, // Guardamos a fatura original no evento
  };
});


const eventStyleGetter = (event) => {
  // Define a cor de fundo com base no status da fatura
  let backgroundColor = '#3b82f6'; // Azul padrão (A vencer)
  if (event.resource.status === 'Paga') {
    backgroundColor = '#22c55e'; // Verde
  }
  if (event.resource.status === 'Atrasada') {
    backgroundColor = '#ef4444'; // Vermelho
  }

  // Monta o objeto de estilo que será aplicado ao evento
  const style = {
    backgroundColor,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block'
  };

  return {
    style: style
  };
};

function CalendarioFaturas() {
  return (
    // O container precisa de uma altura definida para o calendário aparecer
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={eventosFaturas}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        culture='pt-BR'
        eventPropGetter={eventStyleGetter} // Aplica nosso estilo customizado aos eventos
      />
    </div>
  );
}

export default CalendarioFaturas;