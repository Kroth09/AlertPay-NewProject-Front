import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';

const mockFaturas = [
  { id: 1, descricao: 'Energia', valor: 245.80, vencimento: '2025-06-02', status: 'Atrasada' },
  { id: 2, descricao: 'Internet', valor: 119.90, vencimento: '2025-06-15', status: 'A vencer' },
  { id: 3, descricao: 'Academia', valor: 89.00, vencimento: '2025-06-20', status: 'A vencer' },
  { id: 4, descricao: 'Netflix', valor: 39.90, vencimento: '2025-07-01', status: 'A vencer' },
  { id: 6, descricao: 'Aluguel', valor: 1500.00, vencimento: '2025-06-05', status: 'Paga' },
];

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

const eventosFaturas = mockFaturas.map(fatura => {
  const dataVencimento = new Date(fatura.vencimento);
  dataVencimento.setMinutes(dataVencimento.getMinutes() + dataVencimento.getTimezoneOffset());

  return {
    title: `${fatura.descricao} - R$${fatura.valor.toFixed(2)}`,
    start: dataVencimento,
    end: dataVencimento,
    allDay: true,
    resource: fatura,
  };
});


const eventStyleGetter = (event) => {
  let backgroundColor = '#3b82f6';
  if (event.resource.status === 'Paga') {
    backgroundColor = '#22c55e';
  }
  if (event.resource.status === 'Atrasada') {
    backgroundColor = '#ef4444';
  }

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
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={eventosFaturas}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        culture='pt-BR'
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}

export default CalendarioFaturas;
