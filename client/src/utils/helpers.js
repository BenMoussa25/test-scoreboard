export const parseActivityDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const hour = dateObj.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getUTCSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
};

export const countdown = (start, finish) => {
  const startDate = new Date(start).getTime();
  const finishDate = new Date(finish).getTime();
  const now = new Date().getTime();

  let date;
  let status;

  if (now < startDate) {
    date = startDate - now;
    status = 'starts';
  } else if (now > startDate && now < finishDate) {
    date = finishDate - now;
    status = 'ends';
  } else {
    return { ended: true, text: 'CTF Ended! GG' };
  }

  const day = Math.floor(date / (1000 * 60 * 60 * 24));
  const hour = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minute = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((date % (1000 * 60)) / 1000);

  return {
    ended: false,
    status,
    text: `${status === 'starts' ? 'Starts' : 'Ends'} in: ${day} Days, ${hour} Hours, ${minute} Minutes, ${second} Seconds.`
  };
};

export const starSvg = '<svg width="20" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFC56E"><path d="M4.29737 10.418C4.29157 11.9371 5.03243 12.8037 6.71534 12.8359C5.15301 12.8301 4.37668 13.6684 4.29737 15.2539C4.28383 13.758 3.61389 12.8359 1.87939 12.8359C3.43141 12.8147 4.29157 12.0654 4.29737 10.418Z" stroke-width="0.96719" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.41797 0.746094C3.41217 2.26523 4.15304 3.13183 5.83595 3.16407C4.27362 3.15827 3.49728 3.9965 3.41797 5.58204C3.40443 4.08612 2.73449 3.16407 1 3.16407C2.55202 3.14279 3.41217 2.39354 3.41797 0.746094Z" stroke-width="0.96719" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.9205 3.38477C10.9091 6.30216 12.3274 7.95694 15.5648 8.02992C12.5621 8.01848 11.0727 11.7694 10.9205 14.8152C10.8915 11.9418 9.60692 8.02552 6.27539 8.02992C9.25609 7.98771 10.9091 6.54924 10.9205 3.38477Z" stroke-width="1.3189" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
