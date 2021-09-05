import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet, TextInput, FlatList } from 'react-native';
import Button from '../components/Button';
import SkillCard from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
    date?: Date;
}

export default function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill,
        }

        if (newSkill.trim()) {
            setMySkills(oldState => [...oldState, data]);
        }
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Arthur</Text>
            <Text style={[styles.title, { marginTop: 10 }]}>{greeting}</Text>
            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button onPress={handleAddNewSkill} title="Add" />

            <Text style={[styles.title, { marginTop: 50, marginBottom: 15 }]}>My Skills</Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard 
                        onPress={() => handleRemoveSkill(item.id)}
                        skill={item.name} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === "ios" ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
});