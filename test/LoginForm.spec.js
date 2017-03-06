import React from 'react';
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import LoginForm from '../src/LoginForm';
import EmailInput from '../src/EmailInput';
import PasswordInput from '../src/PasswordInput';

chai.use(chaiEnzyme())

describe('LoginFormのテスト', () => {
  let onSubmit;

  beforeEach(() => {
    onSubmit = spy(LoginForm.prototype, 'handleSubmit');
  });

  afterEach(() => {
    onSubmit.restore();
  });

  it('EmailInputとPasswordInputが含まれること', () => {
    const wrapper = shallow(<LoginForm />);

    expect(wrapper).to.have.descendants(EmailInput);
    expect(wrapper).to.have.descendants(PasswordInput);
  });

  it('メールアドレスとパスワードが入力されたとき、handleSubmitが正しい戻り値を返すこと', () => {
    const wrapper = mount(<LoginForm />);
    wrapper.setState({ email: 'bar@example.com', password: 'hoge' });
    wrapper.simulate('submit');

    expect(onSubmit.returnValues[0]).to.equal(true);
  });

  it('メールアドレスが未入力のとき、正しいエラーメッセージが表示されること', () => {
    const wrapper = mount(<LoginForm />);
    wrapper.setState({ email: '', password: 'hoge' });
    wrapper.simulate('submit');

    expect(wrapper).to.have.text('メールアドレスが入力されていません');
  });

  it('パスワードが未入力のとき、正しいエラーメッセージが表示されること', () => {
    const wrapper = mount(<LoginForm />);
    wrapper.setState({ email: 'foo@example.com', password: '' });
    wrapper.simulate('submit');

    expect(wrapper).to.have.text('パスワードが入力されていません');
  })

  it('メールアドレスとパスワードが未入力のとき、正しいエラーメッセージが表示されること', () => {
    const wrapper = mount(<LoginForm />);
    wrapper.simulate('submit');

    expect(wrapper).to.have.text('メールアドレス・パスワードが入力されていません');
  });
});

describe('EmailInputのテスト', () => {

  it('propが渡されたときにvalueにセットされること', () => {
    const wrapper = shallow(<EmailInput />);
    wrapper.setProps({ 'value': 'foo@example.com' });

    expect(wrapper.find('input')).to.have.value('foo@example.com');
  });

  it('メールアドレスが入力されたときにonChangeイベントが発火すること', () => {
    const onChange = spy();

    const wrapper = shallow(<EmailInput onChange={onChange} />);
    wrapper.find('input').simulate(
      'change', {
        target: {
          value: 'x'
        }
      }
    );

    expect(onChange.calledOnce).to.equal(true);
  });
});

describe('PasswordInputのテスト', () => {

  it('propが渡されたときにvalueにセットされること', () => {
    const wrapper = shallow(<PasswordInput />);
    wrapper.setProps({ 'value': 'password' });
    expect(wrapper.find('input')).to.have.value('password');
  });

  it('パスワードが入力されたときにonChangeイベントが発火すること', () => {
    const onChange = spy();

    const wrapper = shallow(<PasswordInput onChange={onChange} />);
    wrapper.find('input').simulate(
      'change', {
        target: {
          value: 'x'
        }
      }
    );

    expect(onChange.calledOnce).to.equal(true);
  });
});
