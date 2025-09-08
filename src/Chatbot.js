import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

// Componentes con estilos
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff9fb;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(219, 112, 147, 0.2);
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h1`
  text-align: center;
  color: #db7093;
  font-family: 'Pacifico', cursive;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  
  &:hover {
    animation: ${pulse} 1s infinite;
  }
`;

const ChatArea = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ffcce0;
  padding: 15px;
  background-color: #fff5f8;
  border-radius: 15px;
  margin-bottom: 20px;
  scroll-behavior: smooth;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const InputField = styled.input`
  width: 80%;
  padding: 12px 15px;
  border: 2px solid #ffb6c1;
  border-radius: 25px;
  background-color: #fff;
  font-size: 16px;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #db7093;
    box-shadow: 0 0 8px rgba(219, 112, 147, 0.4);
  }
  
  &::placeholder {
    color: #ffb6c1;
  }
`;

const SendButton = styled.button`
  width: 18%;
  background: linear-gradient(45deg, #db7093, #ffb6c1);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(219, 112, 147, 0.4);
  }
  
  &:disabled {
    background: linear-gradient(45deg, #cccccc, #dddddd);
    cursor: not-allowed;
  }
`;

const UserMessage = styled.div`
  margin-bottom: 15px;
  text-align: right;
  animation: ${fadeIn} 0.3s ease-out;
  
  span {
    background: linear-gradient(45deg, #c471f5, #fa71cd);
    color: #ffffff;
    padding: 12px 18px;
    border-radius: 20px 20px 2px 20px;
    display: inline-block;
    max-width: 70%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
  }
`;

const BotMessage = styled.div`
  margin-bottom: 15px;
  text-align: left;
  animation: ${fadeIn} 0.5s ease-out;
  
  span {
    background: linear-gradient(45deg, #ffb6c1, #ffdbe0);
    color: #333333;
    padding: 12px 18px;
    border-radius: 20px 20px 20px 2px;
    display: inline-block;
    max-width: 70%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
    
    strong {
      color: #db7093;
    }
  }
`;

// Componente para la animación de escritura
const TypingIndicator = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 15px;
  
  span {
    height: 8px;
    width: 8px;
    margin: 0 2px;
    background-color: #ffb6c1;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.6;
  }
  
  span:nth-child(1) {
    animation: ${pulse} 1s infinite 0.1s;
  }
  
  span:nth-child(2) {
    animation: ${pulse} 1s infinite 0.3s;
  }
  
  span:nth-child(3) {
    animation: ${pulse} 1s infinite 0.5s;
  }
`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatAreaRef = useRef(null);
  
  // Variables de estado para el chatbot
  const [etapa, setEtapa] = useState('inicio');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [numEmpleados, setNumEmpleados] = useState(0);
  const [sector, setSector] = useState('');
  const [sectorPersonalizado, setSectorPersonalizado] = useState('');
  const [ganancias, setGanancias] = useState(0);
  
  const sectores = ["financiero", "industrial", "administrativo", "comercial", "tecnológico", "educativo", "salud", "turismo", "entretenimiento", "otro"];

  // Efecto para desplazamiento automático de mensajes
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Mensaje inicial de bienvenida
  useEffect(() => {
    // Comprobar si ya hay mensajes para evitar duplicados
    if (messages.length === 0) {
      simulateBotTyping("Hola! Bienvenido al sistema de registro de empresas. ¿Cómo te llamas?");
    }
  }, []);

  const simulateBotTyping = (text) => {
    setIsTyping(true);
    
    // Simular tiempo de escritura basado en la longitud del mensaje
    const typingDelay = Math.min(1000, text.length * 40);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, false);
    }, typingDelay);
  };

  const addMessage = (text, isUser) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const validarRespuesta = (respuesta) => {
    const respuestaLower = respuesta.toLowerCase();
    if (['sí', 'si', 's'].some(word => respuestaLower.includes(word))) {
      return true;
    } else if (['no', 'n'].some(word => respuestaLower.includes(word))) {
      return false;
    } else {
      simulateBotTyping("Por favor, responde con 'sí' o 'no'.");
      return null;
    }
  };

  const obtenerNumeroEmpleados = (respuesta) => {
    // Intentar convertir directamente a número
    if (!isNaN(respuesta) && respuesta.trim() !== '') {
      return parseInt(respuesta);
    }

    // Limpiar y normalizar el texto
    const texto = respuesta.toLowerCase().trim()
      .replace(/,/g, '')
      .replace(/\./g, '')
      .replace(/ y /g, ' ');

    // Diccionarios de números en español
    const numerosBasicos = {
      'cero': 0, 'uno': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5,
      'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10,
      'once': 11, 'doce': 12, 'trece': 13, 'catorce': 14, 'quince': 15,
      'dieciséis': 16, 'dieciseis': 16, 'diecisiete': 17, 'dieciocho': 18, 'diecinueve': 19,
      'veinte': 20, 'veintiuno': 21, 'veintidós': 22, 'veintidos': 22, 'veintitrés': 23, 'veintitres': 23,
      'veinticuatro': 24, 'veinticinco': 25, 'veintiséis': 26, 'veintiseis': 26,
      'veintisiete': 27, 'veintiocho': 28, 'veintinueve': 29,
      'treinta': 30, 'cuarenta': 40, 'cincuenta': 50, 'sesenta': 60,
      'setenta': 70, 'ochenta': 80, 'noventa': 90
    };

    const centenasYMiles = {
      'cien': 100, 'ciento': 100, 'doscientos': 200, 'trescientos': 300,
      'cuatrocientos': 400, 'quinientos': 500, 'seiscientos': 600,
      'setecientos': 700, 'ochocientos': 800, 'novecientos': 900,
      'mil': 1000, 'un mil': 1000, 'dos mil': 2000, 'tres mil': 3000,
      'cuatro mil': 4000, 'cinco mil': 5000, 'seis mil': 6000,
      'siete mil': 7000, 'ocho mil': 8000, 'nueve mil': 9000
    };

    // Para expresiones simples como "cincuenta" o "cien"
    if (numerosBasicos[texto] !== undefined) {
      return numerosBasicos[texto];
    }
    if (centenasYMiles[texto] !== undefined) {
      return centenasYMiles[texto];
    }

    // Para expresiones compuestas como "treinta y cinco"
    for (const [decena, valorDecena] of Object.entries(numerosBasicos)) {
      if (valorDecena >= 30 && valorDecena <= 90 && valorDecena % 10 === 0) {
        for (const [unidad, valorUnidad] of Object.entries(numerosBasicos)) {
          if (valorUnidad < 10) {
            const compuesto = `${decena} ${unidad}`;
            if (texto === compuesto) {
              return valorDecena + valorUnidad;
            }
          }
        }
      }
    }

    // Para expresiones con miles como "mil ciento cincuenta"
    if (texto.includes('mil')) {
      let total = 0;
      
      // Determinar el multiplicador de mil
      let multiplicadorMil = 1;
      const palabrasAntesDeMil = texto.split('mil')[0].trim();
      if (palabrasAntesDeMil) {
        for (const [palabra, valor] of Object.entries(numerosBasicos)) {
          if (palabrasAntesDeMil === palabra) {
            multiplicadorMil = valor;
            break;
          }
        }
      }
      
      total += multiplicadorMil * 1000;
      
      // Procesar lo que viene después de "mil"
      const despuesDeMil = texto.split('mil')[1].trim();
      if (despuesDeMil) {
        // Buscar centenas directas
        for (const [centena, valorCentena] of Object.entries(centenasYMiles)) {
          if (despuesDeMil.startsWith(centena) && valorCentena < 1000) {
            total += valorCentena;
            const restoDespuesCentena = despuesDeMil.substring(centena.length).trim();
            
            // Buscar decenas y unidades después de la centena
            for (const [decena, valorDecena] of Object.entries(numerosBasicos)) {
              if (valorDecena >= 30 && valorDecena <= 90 && valorDecena % 10 === 0) {
                if (restoDespuesCentena === decena) {
                  total += valorDecena;
                  break;
                }
                for (const [unidad, valorUnidad] of Object.entries(numerosBasicos)) {
                  if (valorUnidad < 10) {
                    const compuesto = `${decena} ${unidad}`;
                    if (restoDespuesCentena === compuesto) {
                      total += valorDecena + valorUnidad;
                      break;
                    }
                  }
                }
              }
            }
            
            // Si solo hay un número simple después de la centena
            for (const [numero, valor] of Object.entries(numerosBasicos)) {
              if (restoDespuesCentena === numero) {
                total += valor;
                break;
              }
            }
            
            return total;
          }
        }
        
        // Si no hay centenas, buscar decenas y unidades
        for (const [decena, valorDecena] of Object.entries(numerosBasicos)) {
          if (valorDecena >= 20 && valorDecena <= 90) {
            if (despuesDeMil === decena) {
              return total + valorDecena;
            }
            for (const [unidad, valorUnidad] of Object.entries(numerosBasicos)) {
              if (valorUnidad < 10) {
                const compuesto = `${decena} ${unidad}`;
                if (despuesDeMil === compuesto) {
                  return total + valorDecena + valorUnidad;
                }
              }
            }
          }
        }
        
        // Si es un número simple después de mil
        for (const [numero, valor] of Object.entries(numerosBasicos)) {
          if (despuesDeMil === numero) {
            return total + valor;
          }
        }
      }
      
      return total;
    }

    // Para números compuestos como "ciento cincuenta"
    for (const [centena, valorCentena] of Object.entries(centenasYMiles)) {
      if (valorCentena < 1000 && texto.startsWith(centena)) {
        let total = valorCentena;
        const restoDespuesCentena = texto.substring(centena.length).trim();
        
        // Si después de la centena hay un número simple
        if (numerosBasicos[restoDespuesCentena] !== undefined) {
          return total + numerosBasicos[restoDespuesCentena];
        }
        
        // Si después de la centena hay una decena y unidad
        for (const [decena, valorDecena] of Object.entries(numerosBasicos)) {
          if (valorDecena >= 30 && valorDecena <= 90 && valorDecena % 10 === 0) {
            if (restoDespuesCentena === decena) {
              return total + valorDecena;
            }
            for (const [unidad, valorUnidad] of Object.entries(numerosBasicos)) {
              if (valorUnidad < 10) {
                const compuesto = `${decena} ${unidad}`;
                if (restoDespuesCentena === compuesto) {
                  return total + valorDecena + valorUnidad;
                }
              }
            }
          }
        }
      }
    }

    return null;
  };

  const mostrarResumen = () => {
    simulateBotTyping("\n¡Gracias por la información! Aquí está el resumen:");
    
    setTimeout(() => {
      // Determinar qué texto de sector mostrar
      let sectorMostrar = sector;
      if (sector === "otro" && sectorPersonalizado) {
        sectorMostrar = sectorPersonalizado;
      } else {
        sectorMostrar = sector.charAt(0).toUpperCase() + sector.slice(1);
      }
      
      const resumen = `
      - Nombre de la empresa: ${nombreEmpresa}
      - Número de empleados: ${numEmpleados}
      - Sector: ${sectorMostrar}
      - Ganancias del año: $${ganancias.toLocaleString('es-ES', { minimumFractionDigits: 2 })}

      ¡Hasta luego! ✨
      `;
      addMessage(resumen, false);
      setDisabled(true);
    }, 1000);
  };

  const processInput = (mensaje) => {
    switch (etapa) {
      case 'inicio':
        setNombreUsuario(mensaje);
        simulateBotTyping(`Mucho gusto, ${mensaje}. ✨ Vamos a registrar tu empresa.`);
        
        setTimeout(() => {
          simulateBotTyping("¿Cuál es el nombre de tu empresa?");
        }, 1200);
        
        setEtapa('nombre_empresa');
        break;
        
      case 'nombre_empresa':
        setNombreEmpresa(mensaje);
        simulateBotTyping(`Entendido. El nombre de tu empresa es: ${mensaje}.`);
        
        setTimeout(() => {
          simulateBotTyping("¿Es correcto? (sí/no)");
        }, 1000);
        
        setEtapa('confirmar_nombre');
        break;
        
      case 'confirmar_nombre':
        const respuestaNombre = validarRespuesta(mensaje);
        if (respuestaNombre === true) {
          simulateBotTyping("¿Cuántos empleados tiene tu empresa? Puedes escribirlo en números o letras.");
          setEtapa('num_empleados');
        } else if (respuestaNombre === false) {
          simulateBotTyping("Por favor, ingresa el nombre nuevamente.");
          setEtapa('nombre_empresa');
        }
        break;
        
      case 'num_empleados':
        const num = obtenerNumeroEmpleados(mensaje);
        if (num !== null) {
          setNumEmpleados(num);
          simulateBotTyping(`Entendido. Tu empresa tiene ${num} empleados.`);
          
          setTimeout(() => {
            simulateBotTyping("¿Es correcto? (sí/no)");
          }, 1000);
          
          setEtapa('confirmar_empleados');
        } else {
          simulateBotTyping("Por favor, ingresa un número válido o escríbelo en letras.");
        }
        break;
        
      case 'confirmar_empleados':
        const respuestaEmpleados = validarRespuesta(mensaje);
        if (respuestaEmpleados === true) {
          simulateBotTyping("¿A qué sector pertenece tu empresa? (Financiero, Industrial, Administrativo, Comercial, Tecnológico, Educativo, Salud, Turismo, Entretenimiento u Otro)");
          setEtapa('sector');
        } else if (respuestaEmpleados === false) {
          simulateBotTyping("Por favor, ingresa el número de empleados nuevamente.");
          setEtapa('num_empleados');
        }
        break;
        
      case 'sector':
        const sectorLower = mensaje.toLowerCase();
        let sectorEncontrado = sectores.find(s => sectorLower.includes(s));
        
        if (sectorEncontrado) {
          if (sectorEncontrado === "otro") {
            // Si eligió "otro", pedir que especifique el sector
            setSector("otro");
            simulateBotTyping("Has seleccionado 'Otro'. Por favor, especifica a qué sector pertenece tu empresa:");
            setEtapa('sector_personalizado');
          } else {
            setSector(sectorEncontrado);
            simulateBotTyping(`Entendido. Tu empresa pertenece al sector ${sectorEncontrado.charAt(0).toUpperCase() + sectorEncontrado.slice(1)}.`);
            
            setTimeout(() => {
              simulateBotTyping("¿Es correcto? (sí/no)");
            }, 1000);
            
            setEtapa('confirmar_sector');
          }
        } else {
          simulateBotTyping("Sector no reconocido. Por favor, elige entre Financiero, Industrial, Administrativo, Comercial, Tecnológico, Educativo, Salud, Turismo, Entretenimiento u Otro.");
        }
        break;
        
      case 'sector_personalizado':
        setSectorPersonalizado(mensaje);
        setSector("otro");
        simulateBotTyping(`Entendido. Tu empresa pertenece al sector ${mensaje}.`);
        
        setTimeout(() => {
          simulateBotTyping("¿Es correcto? (sí/no)");
        }, 1000);
        
        setEtapa('confirmar_sector');
        break;
        
      case 'confirmar_sector':
        const respuestaSector = validarRespuesta(mensaje);
        if (respuestaSector === true) {
          simulateBotTyping("¿Cuáles fueron las ganancias de tu empresa el último año? (En números)");
          setEtapa('ganancias');
        } else if (respuestaSector === false) {
          if (sector === "otro") {
            simulateBotTyping("Por favor, especifica nuevamente el sector de tu empresa:");
            setEtapa('sector_personalizado');
          } else {
            simulateBotTyping("Por favor, ingresa el sector nuevamente.");
            setEtapa('sector');
          }
        }
        break;
        
      case 'ganancias':
        try {
          const gananciasParsed = parseFloat(mensaje.replace(/,/g, ''));
          if (!isNaN(gananciasParsed)) {
            setGanancias(gananciasParsed);
            simulateBotTyping(`Entendido. Las ganancias fueron: $${gananciasParsed.toLocaleString('es-ES', { minimumFractionDigits: 2 })}.`);
            
            setTimeout(() => {
              simulateBotTyping("¿Es correcto? (sí/no)");
            }, 1000);
            
            setEtapa('confirmar_ganancias');
          } else {
            throw new Error("No es un número válido");
          }
        } catch (e) {
          simulateBotTyping("Por favor, ingresa un número válido.");
        }
        break;
        
      case 'confirmar_ganancias':
        const respuestaGanancias = validarRespuesta(mensaje);
        if (respuestaGanancias === true) {
          mostrarResumen();
        } else if (respuestaGanancias === false) {
          simulateBotTyping("Por favor, ingresa las ganancias nuevamente.");
          setEtapa('ganancias');
        }
        break;
        
      default:
        simulateBotTyping("Lo siento, algo salió mal.");
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isTyping) return;
    
    addMessage(inputValue, true);
    processInput(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSendMessage();
    }
  };

  return (
    <MainContainer>
      <Title>✨ Sistema de Registro de Empresas ✨</Title>
      <ChatArea ref={chatAreaRef}>
        {messages.map((message, index) => (
          message.isUser ? (
            <UserMessage key={index}>
              <span><strong>Tú:</strong> {message.text}</span>
            </UserMessage>
          ) : (
            <BotMessage key={index}>
              <span><strong>Chatbot:</strong> {message.text}</span>
            </BotMessage>
          )
        ))}
        {isTyping && (
          <TypingIndicator>
            <span></span>
            <span></span>
            <span></span>
          </TypingIndicator>
        )}
      </ChatArea>
      <InputContainer>
        <InputField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled || isTyping}
          placeholder="Escribe tu mensaje aquí..."
        />
        <SendButton 
          onClick={handleSendMessage} 
          disabled={disabled || inputValue.trim() === '' || isTyping}
        >
          Enviar
        </SendButton>
      </InputContainer>
    </MainContainer>
  );
}

export default Chatbot;