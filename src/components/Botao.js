//Importação
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//Definição da função do componente
const Botao = props => {
  const texto = props.texto;

  return (
    <TouchableOpacity style={estilos.fundo} onPress={props.funcao}>
      <Text style={estilos.texto}>{texto}</Text>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  fundo: {
    backgroundColor: '#F15025',
    marginVertical: 5,
    width: '100%',
  },
  texto: {
    fontSize: 36,
    color: '#E6E8E6',
    textAlign: 'center',
  },
});

//Exportação
export default Botao;
